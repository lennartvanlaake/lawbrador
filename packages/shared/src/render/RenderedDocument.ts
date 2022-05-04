import { assert } from "chai";
import { v4 } from "uuid";
import type { IndexedTagOrText, TagOrText } from "..";
import { Errors } from "..";
import { escapeRegExp, getIndexedMatches } from "..";

export class RenderedDocument {
  #snippets: IndexedTagOrText[] = [];
  characterIndexToTextSnippet: Map<number, IndexedTagOrText> = new Map();
  snippetToIndexMap: Map<IndexedTagOrText, number> = new Map();
  idToSnippetsMap: Map<string, IndexedTagOrText[]> = new Map();
  strippedString: string;
  htmlString = "";

  constructor(snippets: TagOrText[]) {
    this.#snippets = snippets.map((it, index) => addIndexToSnippet(it, index));
    this.strippedString = this.#snippets
      .filter((it) => it.type == "text")
      .map((it) => it.text)
      .join("");
    this.#update();
  }

  filter(filter: (snippet: IndexedTagOrText) => boolean) {
    this.#snippets = this.#snippets.filter(filter);
    this.#repairSplitText();
    this.#update();
  }

  wrapAllMatching(query: string, pre: TagOrText, post: TagOrText) {
    const matches = getIndexedMatches(
      this.strippedString,
      new RegExp(escapeRegExp(query), "gi")
    );
    matches.forEach((it) =>
      this.#wrapCharacterIndices(it.index, it.index + it.length, pre, post)
    );
  }

  wrapNthMatch(
    query: string,
    matchIndex: number,
    pre: TagOrText,
    post: TagOrText
  ) {
    const matches = getIndexedMatches(
      this.strippedString,
      new RegExp(escapeRegExp(query), "gi")
    );
    const match = matches[matchIndex];
    this.#wrapCharacterIndices(
      match.index,
      match.index + match.length,
      pre,
      post
    );
  }

  wrapSelection(selection: Selection, pre: TagOrText, post: TagOrText) {
    // PUT ALL TEXT IN SPANS AND ADD IDs TO THEM TO MAKE THIS WORK WELL!
    const startingElement = this.idToSnippetsMap.get(
      getClosestId(selection.anchorNode)
    )![0];
    const startOfStartingElement = this.snippetToIndexMap.get(startingElement);
    if (
      startOfStartingElement === undefined ||
      startOfStartingElement === null
    ) {
      throw Error();
    }

    const closingElement = this.idToSnippetsMap.get(
      getClosestId(selection.focusNode)
    )![0];
    const startOfClosingElement = this.snippetToIndexMap.get(closingElement);
    if (startOfClosingElement === undefined || startOfClosingElement === null) {
      throw Error();
    }

    this.#insertAtCharacterIndex(
      startOfClosingElement + selection.focusOffset,
      post
    );
    this.#insertAtCharacterIndex(
      startOfStartingElement + selection.anchorOffset,
      pre
    );
  }

  #wrapCharacterIndices(
    start: number,
    end: number,
    pre: TagOrText,
    post: TagOrText
  ) {
    this.#insertAtCharacterIndex(start, pre);
    this.#insertAtCharacterIndex(end, post);
  }

  #getSnippetContainingCharacter(index: number) {
    const entries = this.characterIndexToTextSnippet.entries();
    let it = entries.next();
    while (!it.done) {
      const entry = { snippet: it.value[1], startIndex: it.value[0] };
      if (
        index >= entry.startIndex &&
        index <= entry.startIndex + entry.snippet.text.length
      ) {
        return entry;
      }
      it = entries.next();
    }
    throw Error();
  }

  #calculateMatchAndOffset(characterIndex: number) {
    const entry = this.#getSnippetContainingCharacter(characterIndex);
    return {
      match: entry.snippet,
      offset: characterIndex - entry.startIndex,
    };
  }

  #insertAtCharacterIndex(characterIndex: number, snippet: TagOrText) {
    const matchAndOffset = this.#calculateMatchAndOffset(characterIndex);
    this.#insertAtMatchAndOffset(
      snippet,
      matchAndOffset.match,
      matchAndOffset.offset
    );
  }

  #insertAtMatchAndOffset(
    snippet: TagOrText,
    match: IndexedTagOrText,
    offset: number
  ) {
    if (offset == match.text.length) {
      this.#snippets.splice(match.index + 1, 0, addIndexToSnippet(snippet));
    } else if (offset) {
      this.#splitSnippet(match, offset);
      this.#snippets.splice(match.index + 1, 0, addIndexToSnippet(snippet));
    } else {
      this.#snippets.splice(match.index, 0, addIndexToSnippet(snippet));
    }
    this.#update();
  }

  #splitSnippet(snippet: IndexedTagOrText, offset: number) {
    this.#snippets.splice(snippet.index, 1);
    if (!snippet || snippet.type != "text") {
      throw Error();
    }
    const firstHalf: IndexedTagOrText = {
      id: v4(),
      text: snippet.text.slice(0, offset),
      origin: "original",
      type: "text",
      index: 0,
    };
    const secondHalf: IndexedTagOrText = {
      id: v4(),
      text: snippet.text.slice(offset),
      origin: "original",
      type: "text",
      index: 0,
    };
    this.#snippets = this.#snippets
      .slice(0, snippet.index)
      .concat(firstHalf)
      .concat(secondHalf)
      .concat(this.#snippets.slice(snippet.index));
    this.#update();
  }

  #repairSplitText() {
    for (let i = 0; i < this.#snippets.length; i++) {
      const it = this.#snippets[i];
      const next = this.#snippets[i + 1];
      // repair previously split text nodes
      if (it.type == "text" && next?.type == "text") {
        it.text += next.text;
        this.#snippets.splice(i + 1, 1);
      }
    }
  }

  #update() {
    let totalLength = 0;
    this.htmlString = "";
    this.characterIndexToTextSnippet.clear();
    this.idToSnippetsMap.clear();
    this.#snippets.forEach((it, index) => {
      it.index = index;
      this.snippetToIndexMap.set(it, totalLength);
      if (it.type == "text") {
        this.characterIndexToTextSnippet.set(totalLength, it);
        totalLength += it.text.length;
        this.htmlString += `<span id="${it.id}" class="text">${it.text}</span>`;
      } else {
        this.htmlString += it.text;
      }
      this.idToSnippetsMap.set(it.id, [
        ...(this.idToSnippetsMap.get(it.id) ?? []),
        it,
      ]);
    });
  }
}

// index can be kept at 0 if indices for the whole array are recalculated afterwards
function addIndexToSnippet(snippet: TagOrText, index = 0): IndexedTagOrText {
  return {
    ...snippet,
    index: index,
  };
}

function getClosestId(node: Node | null) {
  if (!node) {
    throw Error(Errors.NO_ID_IN_NODE);
  }
  if ((node as Element).id) {
    return (node as Element).id;
  }
  return getClosestId(node.parentElement);
}

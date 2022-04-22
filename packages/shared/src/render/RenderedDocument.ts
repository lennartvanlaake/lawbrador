import { v4 } from "uuid";
import type { IndexedTagOrText, TagOrText } from "..";
import { Errors } from "..";
import { escapeRegExp, getIndexedMatches } from "..";

export class RenderedDocument {
  #snippets: IndexedTagOrText[] = [];
  indexToSnippetMap: Map<number, IndexedTagOrText> = new Map();
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
    const startTag = this.#snippets.filter(
      (it) => it.id == getClosestId(selection.anchorNode)
    )[0];
    const startText = this.#snippets.filter(
      (it) => it.index > startTag.index && it.type == "text"
    )[0];
    this.#insertAtMatchAndOffset(pre, startText, selection.anchorOffset);
    const endTag = this.#snippets.filter(
      (it) => it.type == "close" && it.id == getClosestId(selection.focusNode)
    )[0];
    const endText = this.#snippets
      .filter((it) => it.index < endTag.index && it.type == "text")
      .reverse()[0];
    this.#insertAtMatchAndOffset(post, endText, selection.focusOffset);
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

  #calculateMatchAndOffset(characterIndex: number) {
    const matchEntry = Array.from(this.indexToSnippetMap)
      .filter((it) => it[0] < characterIndex)
      .pop();
    if (!matchEntry) {
      throw Error();
    }
    const match = matchEntry[1];
    return {
      match: match,
      offset: characterIndex - matchEntry[0],
    };
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

  #insertAtMatchAndOffset(
    snippet: TagOrText,
    match: IndexedTagOrText,
    offset: number
  ) {
    if (offset) {
      this.#splitSnippet(match, offset);
      this.#snippets.splice(match.index + 1, 0, addIndexToSnippet(snippet));
    } else {
      this.#snippets.splice(match.index, 0, addIndexToSnippet(snippet));
    }
    this.#update();
  }

  #insertAtCharacterIndex(characterIndex: number, snippet: TagOrText) {
    const matchAndOffset = this.#calculateMatchAndOffset(characterIndex);
    this.#insertAtMatchAndOffset(
      snippet,
      matchAndOffset.match,
      matchAndOffset.offset
    );
  }

  #update() {
    let totalLength = 0;
    this.htmlString = "";
    this.indexToSnippetMap.clear();
    this.idToSnippetsMap.clear();
    this.#snippets.forEach((it, index) => {
      it.index = index;
      this.htmlString += it.text;
      this.snippetToIndexMap.set(it, totalLength);
      if (it.type == "text") {
        this.indexToSnippetMap.set(totalLength, it);
        totalLength += it.text.length;
      }
      this.idToSnippetsMap.set(it.id, [
        ...(this.idToSnippetsMap[it.id] ?? []),
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
  const parentId = node.parentElement?.id;
  if (!parentId) {
    throw Error(Errors.NO_ID_IN_NODE);
  }
  return parentId;
}

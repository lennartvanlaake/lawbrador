import { strConcat } from "ajv/dist/compile/codegen";
import type { IndexedTagOrText, TagOrText } from "..";
import { escapeRegExp, getIndexedMatches } from "..";

export class RenderedDocument {
  snippets: IndexedTagOrText[] = [];
  strippedString: string;

  constructor(snippets: TagOrText[]) {
    this.snippets = snippets.map((it, index) => addIndexToSnippet(it, index));
    this.strippedString = this.snippets
      .filter((it) => it.type == "text")
      .join("");
  }
  toHtmlString() {
    return this.snippets.join("");
  }

  recalculateIndex() {
    this.snippets.forEach((it, index) => (it.index = index));
  }

  removeIf(filter: () => boolean) {
    this.snippets = this.snippets.filter(filter);
    this.recalculateIndex();
  }

  wrapAllMatching(query: string, pre: TagOrText, post: TagOrText) {
    const matches = getIndexedMatches(
      this.strippedString,
      new RegExp(escapeRegExp(query))
    );
    matches.forEach((it) =>
      this.wrapCharacterIndices(it.index, it.index + length, pre, post)
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
      new RegExp(escapeRegExp(query))
    );
    const match = matches[matchIndex];
    this.wrapCharacterIndices(match.index, match.index + length, pre, post);
  }

  wrapCharacterIndices(
    start: number,
    end: number,
    pre: TagOrText,
    post: TagOrText
  ) {
    this.insertAtCharacterIndex(start, pre);
    this.insertAtCharacterIndex(end + 1, post);
  }

  calculateMatchAndOffset(characterIndex: number) {
    const textSnippets = this.snippets.filter((it) => it.text);
    let matchIndex = 0;
    let lengthSum = 0;
    let match = textSnippets[matchIndex];
    while (match && lengthSum + match.text.length < characterIndex) {
      lengthSum += match.text.length;
      matchIndex++;
      match = textSnippets[matchIndex];
    }
    // lenghtsum should equal the start of the element in which the characterIndex occurs
    // offset represents the index of the character in the text of the element
    return {
      match: match,
      offset: lengthSum - characterIndex,
    };
  }

  splitSnippet(index: number) {
    const toSplit = this.snippets.splice(index, 1)[0];
    if (!toSplit || toSplit.type != "text") {
      throw Error();
    }
    this.snippets = this.snippets
      .slice(0, index)
      .concat(toSplit)
      .concat(this.snippets.slice(index));
    this.recalculateIndex();
  }

  insertAtCharacterIndex(characterIndex: number, snippet: TagOrText) {
    const matchAndOffset = this.calculateMatchAndOffset(characterIndex);
    if (matchAndOffset.offset) {
      this.splitSnippet(matchAndOffset.offset);
      this.snippets.splice(
        characterIndex + 1,
        0,
        addIndexToSnippet(snippet, characterIndex + 1)
      );
    } else {
      this.snippets.splice(
        characterIndex,
        0,
        addIndexToSnippet(snippet, characterIndex)
      );
    }
    this.recalculateIndex();
  }
}

function addIndexToSnippet(
  snippet: TagOrText,
  index: number
): IndexedTagOrText {
  return {
    ...snippet,
    index: index,
  };
}

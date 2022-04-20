import { v4 } from "uuid";
import type { IndexedTagOrText, TagOrText } from "..";
import { escapeRegExp, getIndexedMatches } from "..";

export class RenderedDocument {
  snippets: IndexedTagOrText[] = [];
  strippedString: string;

  constructor(snippets: TagOrText[]) {
    this.snippets = snippets.map((it, index) => addIndexToSnippet(it, index));
    this.strippedString = this.snippets
      .filter((it) => it.type == "text")
      .map((it) => it.text)
      .join("");
  }
  toHtmlString() {
    return this.snippets.map((it) => it.text).join("");
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
      new RegExp(escapeRegExp(query), "g")
    );
    matches.forEach((it) =>
      this.wrapCharacterIndices(it.index, it.index + it.length, pre, post)
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
      new RegExp(escapeRegExp(query), "g")
    );
    const match = matches[matchIndex];
    this.wrapCharacterIndices(
      match.index,
      match.index + match.length,
      pre,
      post
    );
  }

  wrapCharacterIndices(
    start: number,
    end: number,
    pre: TagOrText,
    post: TagOrText
  ) {
    this.insertAtCharacterIndex(start, pre);
    this.insertAtCharacterIndex(end, post, true);
  }

  calculateMatchAndOffset(characterIndex: number) {
    const textSnippets = this.snippets.filter((it) => it.type == "text");
    let matchIndex = 0;
    let lengthSum = 0;
    let match: IndexedTagOrText;
    do {
      match = textSnippets[matchIndex];
      lengthSum += match.text.length;
      matchIndex++;
    } while (textSnippets[matchIndex] && lengthSum < characterIndex); // lenghtsum should equal the start of the element in which the characterIndex occurs
    // offset represents the index of the character in the text of the element
    return {
      match: match,
      offset: match.text.length - (lengthSum - characterIndex),
    };
  }

  splitSnippet(snippet: IndexedTagOrText, offset: number) {
    this.snippets.splice(snippet.index, 1);
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
    this.snippets = this.snippets
      .slice(0, snippet.index)
      .concat(firstHalf)
      .concat(secondHalf)
      .concat(this.snippets.slice(snippet.index));
    this.recalculateIndex();
  }

  insertAtCharacterIndex(
    characterIndex: number,
    snippet: TagOrText,
    after = false
  ) {
    const afterCorrection = after ? 1 : 0;
    const matchAndOffset = this.calculateMatchAndOffset(characterIndex);
    if (matchAndOffset.offset) {
      this.splitSnippet(matchAndOffset.match, matchAndOffset.offset);
      this.snippets.splice(
        matchAndOffset.match.index + 1 + afterCorrection,
        0,
        addIndexToSnippet(snippet)
      );
    } else {
      this.snippets.splice(
        matchAndOffset.match.index + afterCorrection,
        0,
        addIndexToSnippet(snippet)
      );
    }
    this.recalculateIndex();
  }
}

// index can be kept at 0 if indices for the whole array are recalculated afterwards
function addIndexToSnippet(snippet: TagOrText, index = 0): IndexedTagOrText {
  return {
    ...snippet,
    index: index,
  };
}

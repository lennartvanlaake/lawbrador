import type {
  CloseTag,
  IndexedTagOrText,
  OpenTag,
  TagOrText} from "..";
import {
  deduplicateWhitespace,
  escapeRegExp,
  getIndexedMatches
} from "..";

export class RenderedDocument {
  snippets: IndexedTagOrText[] = [];
  push(snippet: TagOrText) {
    this.snippets.push(addIndexToSnippet(snippet, this.snippets.length));
  }

  toHtmlString() {
    return this.snippets.join("");
  }

  toStrippedString() {
    return this.snippets.filter((it) => it.type == "text").join("");
  }

  recalculateIndex() {
    this.snippets.forEach((it, index) => (it.index = index));
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

  removeIf(filter: () => boolean) {
    this.snippets = this.snippets.filter(filter);
    this.recalculateIndex();
  }

  wrapAllMatching(query: string, pre: OpenTag, post: CloseTag) {
    const matches = getIndexedMatches(
      this.toStrippedString(),
      new RegExp(escapeRegExp(query))
    );
    matches.forEach((it) =>
      this.wrapCharacterIndices(it.index, it.index + length, pre, post)
    );
  }

  wrapNthMatch(
    query: string,
    matchIndex: number,
    pre: OpenTag,
    post: CloseTag
  ) {
    const matches = getIndexedMatches(
      this.toStrippedString(),
      new RegExp(escapeRegExp(query))
    );
    const match = matches[matchIndex];
    this.wrapCharacterIndices(match.index, match.index + length, pre, post);
  }

  wrapCharacterIndices(
    start: number,
    end: number,
    pre: OpenTag,
    post: CloseTag
  ) {
    const startMatch = this.calculateMatchAndOffset(start);
    if (startMatch.offset != 0) {
      this.splitSnippet(startMatch.offset);
      this.wrapSnippet(startMatch.match.index + 1, pre, post);
    } else {
      this.wrapSnippet(startMatch.match.index, pre, post);
    }
    const endMatch = this.calculateMatchAndOffset(end);
    if (endMatch.offset != 0) {
      this.splitSnippet(endMatch.offset);
      this.wrapSnippet(endMatch.match.index + 1, pre, post);
    } else {
      this.wrapSnippet(endMatch.match.index, pre, post);
    }
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

  wrapSnippet(index: number, pre: OpenTag, post: CloseTag) {
    this.snippets.splice(index, 0, addIndexToSnippet(pre, index));
    this.snippets.splice(index + 2, 0, addIndexToSnippet(post, index + 2));
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

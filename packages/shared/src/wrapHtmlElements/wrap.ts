import type { IndexedMatch } from "..";
import { insertAt } from "..";

export function wrapMatches(
  html: string,
  matches: IndexedMatch[],
  tagPositions: IndexedMatch[],
  startTag: string,
  endTag: string
) {
  let insertedCharacters = 0;
  matches.forEach((it) => {
    const startTagIndex =
      calculateInsertPosition(it.index, tagPositions, false) +
      insertedCharacters;
    html = insertAt(html, startTag, startTagIndex);
    insertedCharacters += startTag.length;
    const endTagIndex =
      calculateInsertPosition(it.index + it.length, tagPositions, true) +
      insertedCharacters;
    html = insertAt(html, endTag, endTagIndex);
    insertedCharacters += endTag.length;
  });
  return html;
}

function calculateInsertPosition(
  matchIndex: number,
  tagPositions: IndexedMatch[],
  isEnd: boolean
): number {
  const endAdjustment = isEnd ? 1 : 0;
  let offset = 0;
  let tagPositionIndex = 0;
  let tagMatch = tagPositions[tagPositionIndex];
  while (tagMatch && matchIndex + offset >= tagMatch.index + endAdjustment) {
    if (!tagMatch) break;
    offset += tagMatch.length;
    tagPositionIndex++;
    tagMatch = tagPositions[tagPositionIndex];
  }
  return matchIndex + offset;
}

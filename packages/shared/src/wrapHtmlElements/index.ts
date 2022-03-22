const tagRegex = /<[^<>]*>/g;
export function wrapElements(
  html: string,
  searchTerm: string,
  insertBefore: string,
  insertAfter: string
) {
  //const regexString = searchTerm + "|" + searchTerm.split(/\s+/).join("|");
  const regexString = searchTerm.trim();
  const regex = new RegExp(regexString, "gi");
  const tagPositions = getIndexedMatches(html, tagRegex);
  const strippedHtml = html.replace(tagRegex, "");
  const matches = getIndexedMatches(strippedHtml, regex);
  return wrapMatches(html, matches, tagPositions, insertBefore, insertAfter);
}

function getIndexedMatches(input: string, regex: RegExp): IndexedMatch[] {
  const matches: IndexedMatch[] = [];
  let match = regex.exec(input);
  while (match) {
    matches.push({ length: match[0].length, index: match.index });
    match = regex.exec(input);
  }
  return matches;
}

function wrapMatches(
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

function insertAt(original: string, toInsert: string, index: number): string {
  return [original.slice(0, index), toInsert, original.slice(index)].join("");
}

interface IndexedMatch {
  index: number;
  length: number;
}

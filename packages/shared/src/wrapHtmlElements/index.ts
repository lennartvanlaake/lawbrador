import { deduplicateWhitespace, escapeRegExp, getIndexedMatches } from "..";
import { getMarking } from "./mark";
import { wrapMatches } from "./wrap";

const tagRegex = /<[^<>]*>/g;
export function wrapElements(
  html: string,
  searchTerm: string,
  insertBefore: string,
  insertAfter: string
) {
  html = deduplicateWhitespace(html);
  const tagPositions = getIndexedMatches(html, tagRegex);
  const strippedHtml = html.replace(tagRegex, "");
  const regex = new RegExp(escapeRegExp(searchTerm.trim()), "gi");
  const matches = getIndexedMatches(strippedHtml, regex);
  return wrapMatches(html, matches, tagPositions, insertBefore, insertAfter);
}

export function getMarkingFromSelection(html: string, selection: Selection) {
  html = deduplicateWhitespace(html);
  const tagPositions = getIndexedMatches(html, tagRegex);
  const strippedHtml = html.replace(tagRegex, "");
  const regex = new RegExp(escapeRegExp(selection.toString()), "gi");
  const matches = getIndexedMatches(strippedHtml, regex);
  return getMarking(matches, selection, tagPositions);
}

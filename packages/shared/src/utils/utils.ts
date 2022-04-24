import type { DocumentRuleSet, Identity, RestructuredNode } from "..";
import { DEFAULT_EMPTY_RULESET } from "..";
import { eurlexConfig } from "..";
import { parse } from "../parse/scraper";
import { applyRuleSet } from "../restructure";

export function last(array: any[]) {
  return array[array.length - 1];
}

export function toIdentity(id: string): Identity {
  return { _id: id };
}

export function logObject(object: any) {
  console.dir(object, { depth: null, colors: true });
}

export function defaultRestructure(html: string): RestructuredNode {
  const ruleSet: DocumentRuleSet = DEFAULT_EMPTY_RULESET;
  const sourceUrl = "http://source.url";
  return applyRuleSet(parse(html), ruleSet, eurlexConfig, sourceUrl);
}

export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getIndexedMatches(
  input: string,
  regex: RegExp
): IndexedMatch[] {
  const matches: IndexedMatch[] = [];
  let match = regex.exec(input);
  while (match) {
    matches.push({
      length: match[0].length,
      index: match.index,
      string: match[0],
    });
    const newMatch = regex.exec(input);
    // using lookbehinds can cause an infinite loop
    if (newMatch == match) break;
    match = newMatch;
  }
  return matches;
}

export function insertAt(
  original: string,
  toInsert: string,
  index: number
): string {
  return [original.slice(0, index), toInsert, original.slice(index)].join("");
}

export interface IndexedMatch {
  index: number;
  length: number;
  string: string;
}

export function deduplicateWhitespace(original: string) {
  return original.replace(/\s+/g, " ");
}

export function removeNewlines(original: string) {
  return original.replace(/(\r\n|\n|\r)/gm, "");
}

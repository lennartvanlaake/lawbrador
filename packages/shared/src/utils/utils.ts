import type { DocumentRuleSet, Identity, RestructuredNode } from "..";
import { DEFAULT_EMPTY_RULESET } from "..";
import { eurlexConfig } from "..";
import { parse } from "../parse/scraper";
import { applyRuleSet } from "../restructure";

// shameless copy-pasta from stack overflow
export function id() {
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  })
;}

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

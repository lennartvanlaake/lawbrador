import type {
  DocumentRuleSet,
  Identity,
  RestructuredNode} from "..";
import {
  DEFAULT_EMPTY_RULESET
} from "..";
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

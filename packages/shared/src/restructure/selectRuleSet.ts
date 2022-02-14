import type {DocumentRuleSet, ParsedNode, SourceSiteConfig} from '..';
import {getFirstMatching, } from "..";

export function selectRuleSet(
  root: ParsedNode,
  config: SourceSiteConfig
): DocumentRuleSet | null {
  for (let i = 0; i < config.documentRuleSets.length; i++) {
    const ruleSet = config.documentRuleSets[i];
    debugger;
    const matchesConditions = getFirstMatching(root, ...(ruleSet.conditionRules ?? []));
    const matchesBody = ruleSet.bodyRule && getFirstMatching(root, ruleSet.bodyRule!!);
    if (matchesConditions && matchesBody) {
      return ruleSet;
    }
  }
  return null;
}


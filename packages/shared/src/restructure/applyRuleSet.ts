import type { DocumentRuleSet, ParsedNode, RestructuredNode, SourceSiteConfig } from "..";
import { getFirstMatching, getTagConfig } from "..";
import { modifyInput } from "./modifyInput";
import { modifyOutput } from "./modifyOutput";
import { restructureRecursive } from "./restructureRecursive";

export function applyRuleSet(
  root: ParsedNode,
  rules: DocumentRuleSet | undefined,
  sourceConfig: SourceSiteConfig,
  sourceUrl: string
): RestructuredNode {
  const body = rules?.bodyRule ? getFirstMatching(root, rules.bodyRule) : root;
  const modifyingRules = rules?.markupRules ?? [].filter((it) => getTagConfig(it).modifies);
  const pureRules = rules?.markupRules ?? [].filter((it) => !getTagConfig(it).modifies);
  const modifiedInput = modifyInput(body!!, modifyingRules);
  const restructured = restructureRecursive(modifiedInput, pureRules);
  const modifiedOutput = modifyOutput(restructured, sourceConfig, sourceUrl, null);
  return modifiedOutput;
}

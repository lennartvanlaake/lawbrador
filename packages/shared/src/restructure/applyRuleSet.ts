import type { DocumentRuleSet, ParsedNode, RestructuredNode } from "..";
import { getFirstMatching, getTagConfig } from "..";
import { modifyInput } from "./modifyInput";
import { modifyOutput } from "./modifyOutput";
import { restructureRecursive } from "./restructureRecursive";

export function applyRuleSet(
  root: ParsedNode,
  rules: DocumentRuleSet | null
): RestructuredNode {
  if (!rules) {
 	return restructureRecursive(root, []);
  }
  const body = rules?.bodyRule ? getFirstMatching(root, rules.bodyRule) : root;
  const modifyingRules = rules.markupRules ?? [].filter((it) => getTagConfig(it).modifies);
  const pureRules = rules.markupRules ?? [].filter((it) => !getTagConfig(it).modifies);
  modifyInput(body!!, modifyingRules);
  const restructured = restructureRecursive(body!!, pureRules);
  modifyOutput(restructured);
  return restructured;
}

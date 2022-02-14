import {DocumentRuleSet, getFirstMatching, ParsedNode, RestructuredNode} from "..";
import {modifyInput} from "./modifyInput";
import {modifyOutput} from "./modifyOutput";
import {restructureRecursive} from "./restructureRecursive";

export function applyRuleSet(
  root: ParsedNode,
  rules: DocumentRuleSet | null
): RestructuredNode {
  const body = rules?.bodyRule ? getFirstMatching(root, rules.bodyRule) : root;
  const modifyingRules = rules.markupRules ?? [].filter((it) => it.modifies);
  const pureRules = rules.markupRules ?? [].filter((it) => !it.modifies);
  modifyInput(body, modifyingRules);
  const restructured = restructureRecursive(body, pureRules);
  modifyOutput(restructured)
  return restructured;
}

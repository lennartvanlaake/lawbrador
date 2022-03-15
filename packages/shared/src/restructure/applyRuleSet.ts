import {
  DocumentRuleSet,
  Errors,
  ParsedNode,
  RestructuredNode,
  SourceSiteConfig,
} from "..";
import { getFirstMatching } from "..";
import { modifyOutput } from "./modifyOutput";
import { restructureRecursive } from "./restructureRecursive";

export function applyRuleSet(
  root: ParsedNode,
  rules: DocumentRuleSet | undefined,
  sourceConfig: SourceSiteConfig,
  sourceUrl: string
): RestructuredNode {
  const body = rules?.bodyRule ? getFirstMatching(root, rules.bodyRule) : root;
  if (!body) {
    throw new Error(Errors.NO_BODY_FOUND);
  }
  const idMap = {};
  const restructured = restructureRecursive(
    body,
    rules?.markupRules ?? [],
    idMap
  );
  const modifiedOutput = modifyOutput(restructured, sourceConfig, idMap, sourceUrl);
  return modifiedOutput;
}

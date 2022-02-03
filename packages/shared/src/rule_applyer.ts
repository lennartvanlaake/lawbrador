import {
  ParsedNode,
  ParsedNodeData,
  RestructuredNode,
  RestructuredDocument,
  ScrapeResult,
} from "@lawbrador/shared/src/schemas/scrape";
import {
  DocumentRuleSet,
  MarkupNotation,
  MarkupRule,
  SourceSiteConfig,
} from "packages/shared/src/schemas/rules";
import { getFirstMatching, matches } from "./matcher";

export function applyConfig(
  scrapeResult: ScrapeResult,
  config: SourceSiteConfig
): RestructuredDocument {
  const ruleSet = selectRuleSet(scrapeResult.body, config);
  const body = applyRuleSet(scrapeResult.body, ruleSet);
  return {
    url: scrapeResult.url,
    hash: scrapeResult.hash,
    body: body,
  };
}

export function selectRuleSet(
  root: ParsedNode,
  config: SourceSiteConfig
): DocumentRuleSet | null {
  for (let i = 0; i < config.documentRuleSets.length; i++) { 	  
    const ruleSet = config.documentRuleSets[i];
    debugger;
    const matchesConditions =
      //@ts-ignore - this somehow breaks a recursivity-check in TS
      ruleSet.conditionRules?.every((rs) => getFirstMatching(root, rs)) ?? true;
    const matchesBody = !!getFirstMatching(root, ruleSet.bodyRule);
    if (matchesConditions && matchesBody) {
      return ruleSet;
    }
  }
  return null;
}

export function applyRuleSet(
  root: ParsedNode,
  rules: DocumentRuleSet | null
): RestructuredNode {
  if (!rules?.bodyRule) {
    return restructureRecursive(root, rules.markupRules ?? []);
  }
  const body = getFirstMatching(root, rules.bodyRule);
  return restructureRecursive(body, rules.markupRules ?? []);
}

function restructureRecursive(node: ParsedNode, markupRules: MarkupRule[]): RestructuredNode {
  const name = getMarkdownNotation(node, markupRules); 
  if (!node.children || node.children.length == 0) {
    return {
      name: name ?? "p",
      children: node.data.map((c) => restructureNodeData(c)),
    };
  } else if (node.children.length == 1) {
    return restructureRecursive(node.children[0], markupRules);
  } else {
    return {
      name: name ?? "div",
      children: node.children.map((c) => restructureRecursive(c, markupRules)),
    };
  }
}

function getMarkdownNotation(node: ParsedNode, markupRules: MarkupRule[]): MarkupNotation | null {
	for (let i = 0; i < markupRules.length; i ++) {
		const rule = markupRules[i];
		if (matches(node, rule.filter)) {
			return rule.notation
		}
	}
	return null
}

function restructureNodeData(data: ParsedNodeData): RestructuredNode {
  if (data.href) {
    return {
      name: "a",
      href: data.href,
      text: data.text,
    };
  } else {
    return {
      text: data.text,
    };
  }
}

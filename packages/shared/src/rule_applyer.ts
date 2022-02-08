import {
  ParsedNode,
  ParsedNodeData,
  RestructuredNode,
  RestructuredDocument,
  ScrapeResult,
} from "@lawbrador/shared/src/schemas/scrape";
import {
  DocumentRuleSet,
  MarkupRule,
  SourceSiteConfig,
} from "@lawbrador/shared/src/schemas/rules";
import { getFirstMatching, matches } from "./matcher";
import { getTagConfig, TagName } from "@lawbrador/shared/src/schemas/tags";

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
  const body = rules?.bodyRule ? getFirstMatching(root, rules.bodyRule) : root;
  return restructureRecursive(body, rules?.markupRules ?? []);
}

function restructureRecursive(
  node: ParsedNode,
  markupRules: MarkupRule[]
): RestructuredNode {
  const modfiyingRules = markupRules.filter(it => getTagConfig(it.tag).modifies)
  applyModifyingRules(node, modfiyingRules)
  const children = node.children.map((c) => restructureRecursive(c, markupRules));
  const tag: TagName = getTag(node, children, markupRules);
  return {
	name: tag,
	children: children,
	text: node.text,
	href: node.href
  }
}

function applyLiMarkerRule(node: ParsedNode, markupRule: MarkupRule) {
	// only break up nodes when using regex on text to find li markers
	if (markupRule.filter.location != 'text' || markupRule.filter.op != 'regex') {
		return;
	}
	const re = new RegExp(markupRule.filter.value);
	const newChildren: ParsedNodeData[] = [];
	node.children.forEach(it => {
		const matched = it?.text.match(re)[0]?.trim()
		if (matched) {
			it.text.replace(matched, "");
			newChildren.push({ text: matched })
		}
	});
	node.children = [ ...newChildren, ...node.children ] 
}

function applyModifyingRules(node: ParsedNode, markupRules: MarkupRule[]) {
	markupRules.forEach(it => {
		switch (it.tag) {
			case "li-marker": 
				applyLiMarkerRule(node, it)						
		}
	})
}

function getTag(
  node: ParsedNode,
  children: RestructuredNode[] | undefined,
  markupRules: MarkupRule[]
): TagName {
  // does a markup rule assign a tag directly?
  for (let i = 0; i < markupRules.length; i++) {
    const rule = markupRules[i];
    if (matches(node, rule.filter)) {
      return rule.tag;
    }
  }
  if (children?.length > 0) {
	// if paragraph/article number is detected, mark as list item
	if (children.some(it => it.name == 'li-marker')) {
		return "li"
	}
	// by default set to ordered list if all children are list items 
	if (children.every(it => it.name == 'li')) {
		return "ol" 
	}
	// if there are children with text, default to paragraph
	if (children.some(it => it.text)) {
		return "p"
	}

	// else return as div
	return "div"
  } else {
	// links are "a" by default
	if (node.href) {
		return "a"
	}
	// else return as plain text
	return "text"
  }
}

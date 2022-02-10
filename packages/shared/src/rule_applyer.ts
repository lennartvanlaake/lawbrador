import {
  ParsedNode,
  RestructuredNode,
  RestructuredDocument,
  TextNode,
  ScrapeResult,
} from "@lawbrador/shared/src/schemas/scrape";
import {
  DocumentRuleSet,
  MarkupRule,
  SourceSiteConfig,
} from "@lawbrador/shared/src/schemas/rules";
import { getFirstMatching, matches } from "./matcher";
import { TagName } from "@lawbrador/shared/src/schemas/tags";

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
  const modifyingRules = rules.markupRules ?? [].filter(it => it.modifies);
  const pureRules = rules.markupRules ?? [].filter(it => !it.modifies);
  modifyInput(body, modifyingRules);
  const restructued = restructureRecursive(body, pureRules);
  modifyOutput(restructued);
  return restructued;
}

function restructureRecursive(
  node: ParsedNode,
  markupRules: MarkupRule[],
): RestructuredNode {
  const children = node.children?.map((c) =>
    restructureRecursive(c, markupRules)
  );
  const tag: TagName = getTag(node, children, markupRules);
  let output = {
    name: tag,
    children: children,
    text: node.text,
    href: node.href 
  };
  return output as RestructuredNode;
}

function modifyInput(
  node: ParsedNode,
  markupRules: MarkupRule[],
  parentNode: ParsedNode | null = null
) {
  markupRules.forEach((it) => {
    switch (it.tag) {
      case "li-marker":
        applyLiMarkerRule(node, it, parentNode);
        break;
    }
  });
  node.children?.forEach(it => modifyInput(it, markupRules, node))
  return node;
}

function applyLiMarkerRule(
  node: ParsedNode,
  markupRule: MarkupRule,
  parentNode: ParsedNode | null
) {
  if (!parentNode) {
	return;
  }
  // only break up nodes when using regex on text to find li markers
  if (markupRule.filter.location != "text" || markupRule.filter.op != "regex") {
    return;
  }
  const re = new RegExp(markupRule.filter.value);
  const matched = node?.text?.match(re)[0]?.trim();
  if (matched) {
    debugger;
    node.text = node.text.replace(matched, "").trim();
    parentNode.children.push({ text: matched, name: "li-marker" });
  }
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
  if (node.name == "li-marker") {
    return "li-marker";
  }
  // links are "a" by default
  if (node.href) {
    return "a";
  }
  if (children?.length > 0) {
    // if paragraph/article number is detected, mark as list item
    if (children.some((it) => it.name == "li-marker")) {
      return "li";
    }
    // by default set to ordered list if all children are list items
    if (children.every((it) => it.name == "li")) {
      return "ol";
    }
    // if there are children with text, default to paragraph
    if (children.some((it) => it.name == "text")) {
      return "p";
    }
    // else return as div
    return "div";
  } else {
    // else return as plain text
    return "text";
  }
}

function modifyOutput(node: RestructuredNode): RestructuredNode {
  switch (node.name) {
    case "div":
      if (node.children.length == 1) return node.children[0];
      break;
    case "li":
      node.marker = node.children.filter(it => it.name == "li-marker")[0] as TextNode;
      node.children = node.children.filter(it => it.name != "li-marker")
      break; 
  }
  node.children?.forEach(it => modifyOutput(it))
  return node;
}

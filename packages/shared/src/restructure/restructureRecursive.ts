import type { MarkupRule, ParsedNode, RestructuredNode, TagName } from "..";
import { matches } from "..";

export function restructureRecursive(
  node: ParsedNode,
  markupRules: MarkupRule[],
  parentTag: string | null = null
): RestructuredNode {
  const tag: TagName = getTag(node, markupRules, parentTag);
  const children = node.children?.map((c) =>
    restructureRecursive(c, markupRules, tag)
  );
  let output = {
    name: tag,
    children: children,
    text: node.text,
    href: node.href,
  };
  return output as RestructuredNode;
}

function getTag(
  node: ParsedNode,
  markupRules: MarkupRule[],
  parentTag: string | null
): TagName {
  // does a markup rule assign a tag directly?
  for (let i = 0; i < markupRules.length; i++) {
    const rule = markupRules[i];
    if (matches(node, rule.filter)) {
      return rule.tag;
    }
  }
  // apply marker assigned by applyLiMarkerRule
  if (node.tags.includes("li-marker")) {
    return "li-marker";
  }

  // links are "a" by default
  if (node.href) {
    return "a";
  }
  if (node.children && node.children.length > 0) {
    // if the parent is a p and it includes text, display text inline 
    if (node.children?.some((it) => it.text?.trim())) {
      if (parentTag == "p") {
        return "inline";
      } else {
        return "p";
      }
    } else {
      return "div";
    }
  }
  // if no children exists and the node has not been pre-filtered, it must contain text
  return "text";
}

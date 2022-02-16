import type {
  MarkupRule,
  ParsedNode,
  RestructuredNode,
  TagName,
} from "..";
import { matches } from "..";

export function restructureRecursive(
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
    href: node.href,
  };
  return output as RestructuredNode;
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
  // apply marker assigned by applyLiMarkerRule
  if (node.tags.includes("li-marker")) {
    return "li-marker";
  }

  // links are "a" by default
  if (node.href) {
    return "a";
  }
  if (children && children.length > 0) {
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

import {
  DocumentRuleSet,
  id,
  MarkupRule,
  ParsedNode,
  RestructuredNode,
  TagName,
} from "..";
import { getTagConfig } from "..";
import { matches, ALL_MARKUP_NOTATIONS } from "..";

export function restructureRecursive(
  node: ParsedNode,
  ruleSet: DocumentRuleSet | undefined,
  idMap: Record<string, string>,
  parentTag: string | null = null
): RestructuredNode {
  const tag: TagName = getTag(node, ruleSet, parentTag);
  const children = node.children?.map((c) =>
    restructureRecursive(c, ruleSet, idMap, tag)
  );
  const output = {
    id: id(),
    name: tag,
    children: children,
    text: node.text,
    href: node.href,
  };
  node.ids?.forEach((it) => (idMap[it] = output.id));
  return output as RestructuredNode;
}

function getTag(
  node: ParsedNode,
  ruleSet: DocumentRuleSet | undefined,
  parentTag: string | null
): TagName {
  if (ruleSet) {
    const markupRules = ruleSet?.markupRules ?? [];
    // does a markup rule assign a tag directly?
    for (let i = 0; i < markupRules.length; i++) {
      const rule = markupRules[i];
      if (matches(node, rule.filter)) {
        return rule.tag;
      }
    }

    if (ruleSet.preserveMarkup) {
      for (let i = 0; i < node.tags.length; i++) {
        const tag = node.tags[i];
        if (ALL_MARKUP_NOTATIONS.includes(tag)) {
          return tag;
        }
      }
    }
  }

  // links are "a" by default
  if (node.href) {
    return "a";
  }
  if (node.children && node.children.length > 0) {
    // if the node contains text and the parent is absent or a container it is a type of paragraph
    if (node.children?.some((it) => it.text?.trim())) {
      if (!parentTag || getTagConfig(parentTag).type == "container") {
        return "p";
      } else {
        return "inline";
      }
    } else {
      return "div";
    }
  }
  // if no children exists and the node has not been pre-filtered, it must contain text
  return "text";
}

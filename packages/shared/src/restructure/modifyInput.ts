import type { MarkupRule, ParsedNode } from "..";

export function modifyInput(
  node: ParsedNode,
  markupRules: MarkupRule[],
  parentNode: ParsedNode | null = null,
): ParsedNode {
  node.children?.forEach((it) => modifyInput(it, markupRules, node));
  markupRules.forEach((it) => {
    switch (it.tag) {
      case "li-marker":
        applyLiMarkerRule(node, it, parentNode);
        break;
    }
  });
  return node;
}

function applyLiMarkerRule(
  node: ParsedNode,
  markupRule: MarkupRule,
  parentNode: ParsedNode | null | undefined,
) {
  if (!parentNode) {
    return;
  }
  // only break up nodes when using regex on text to find li markers
  if (markupRule.filter.location != "text" || markupRule.filter.op != "includes") {
    return;
  }
  const re = new RegExp(markupRule.filter.value);
  const match = node?.text?.match(re);
  if (!match || match.length == 0) {
    return;
  }
  const matchedString = match[0]?.trim();
  node.text = node.text?.replace(matchedString, "")?.trim();
  parentNode.children?.push({ text: matchedString, tags: ["li-marker"], ids: [], classes: [], childIndex: 0 });
}

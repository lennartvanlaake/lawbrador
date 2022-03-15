import { getTagConfig, makeLinkAbsolute } from "..";
import type { RestructuredNode, SourceSiteConfig } from "..";
import { detectLiElements, wrapLiElementsInOl } from "./lineNumbers";
import { adjustLinkNode } from "./links";

export function modifyOutput(
  node: RestructuredNode,
  sourceConfig: SourceSiteConfig,
  idMap: Record<string, string>,
  sourceUrl: string
): RestructuredNode {
  //nothing to do if no children
  if (!node.children) {
    return node;
  }
  node.children = node.children.map((it) =>
    modifyOutput(it, sourceConfig, idMap, sourceUrl)
  );

  if (node.name == "a") {
    return adjustLinkNode(node, sourceUrl, idMap, sourceConfig);
  }
  node = detectLiElements(node);
  node = wrapLiElementsInOl(node);
  return node;
}

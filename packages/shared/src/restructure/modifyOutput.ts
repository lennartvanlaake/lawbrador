import {
  getTagConfig,
  makeLinkAbsolute,
} from "..";
import type { MarkupRule, ParsedNode, LinkNode,
  RestructuredNode,
  SourceSiteConfig,
  TextNode,
} from "..";
import {detectLiElements, wrapLiElementsInOl} from "./lineNumbers";

//matches on start of string and stops match at whitespace in end:
// - starts a non-word character, then 1 to 5 word characters, then non-word characters ((1), (a), (iii))
// - one to five digits potentially followed by non-word character (1, 1., 123) 
// - any single non-word character (-, *, ~)

export function modifyOutput(
  node: RestructuredNode,
  sourceConfig: SourceSiteConfig,
  sourceUrl: string
): RestructuredNode {
 //nothing to do if no children
  if (!node.children) {
    return node;
  }
  node.children = node.children.map((it) =>
    modifyOutput(it, sourceConfig, sourceUrl)
  );
  
  if (node.name == "a") {
	return adjustLinkNode(node, sourceUrl, sourceConfig)
  }
  node = detectLiElements(node);
  node = wrapLiElementsInOl(node)
  return node;
}


function adjustLinkNode(node: LinkNode, sourceUrl: string, sourceConfig: SourceSiteConfig): LinkNode {
   node.href =  `./document?url=${encodeURIComponent(
      makeLinkAbsolute(node.href, sourceUrl)
    )}&sourceConfigId=${sourceConfig._id}`
   return node; 
}





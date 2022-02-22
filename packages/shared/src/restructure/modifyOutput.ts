
import { makeLinkAbsolute, RestructuredNode, SourceSiteConfig, TextNode } from "..";

export function modifyOutput(node: RestructuredNode, sourceConfig: SourceSiteConfig, sourceUrl: string, parent: RestructuredNode | null): RestructuredNode {
  if (!node.children) {
	return node;
  }
  node.children = node.children.map((it) => modifyOutput(it, sourceConfig, sourceUrl, node));
  ;
  if (node.children.some(it => it.name == "li-marker")) {
   	node = {
           name: "li",
	   marker: node.children.filter(it => it.name == "li-marker")[0] as TextNode,
	   children: node.children.filter(it => it.name != "li-marker" && !it.children?.every(c => c.name == "li-marker"))
	}
	// wrap in ol if single node list
	if (!parent) {
	  return {
 		name: "ol",
		children: [ node ]
	  }
	}
  }
  if (node.children?.some(it => it.name == "li")) {
	node.name = "ol";
  }
  if (node.name == "a") {
	node.href = `./document?url=${encodeURIComponent(makeLinkAbsolute(node.href, sourceUrl))}&sourceConfigId=${sourceConfig._id}`;
  	console.log(node.href);
  }
  return node;
}

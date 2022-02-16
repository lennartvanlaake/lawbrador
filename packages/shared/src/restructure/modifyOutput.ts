
import type { RestructuredNode, TextNode } from "..";

export function modifyOutput(node: RestructuredNode, parent: RestructuredNode | null): RestructuredNode {
  debugger;
  if (!node.children) {
	return node;
  }
  node.children = node.children.map((it) => modifyOutput(it, node));
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
  if (node.children?.every(it => it.name == "li")) {
	node.name = "ol";
  }
  return node;
}

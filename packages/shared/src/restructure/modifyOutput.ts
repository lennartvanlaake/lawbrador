
import { RestructuredNode, TextNode } from "..";

export function modifyOutput(node: RestructuredNode): RestructuredNode {
  node.children?.forEach((it) => modifyOutput(it));
  if (node.children?.some(it => it.name == "li-marker")) {
   	node = {
           name: "li",
	   marker: node.children.filter(it => it.name == "li-marker")[0] as TextNode,
	   children: node.children.filter(it => it.name != "li-marker")
	}
  }
  if (node.children?.every(it => it.name == "li")) {
	node.name = "ol";
  }
  return node;
}

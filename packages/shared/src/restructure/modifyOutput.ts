import {
  makeLinkAbsolute,
  RestructuredNode,
  SourceSiteConfig,
  TextNode,
} from "..";

export function modifyOutput(
  node: RestructuredNode,
  sourceConfig: SourceSiteConfig,
  sourceUrl: string,
  parent: RestructuredNode | null
): RestructuredNode {
  if (!node.children) {
    return node;
  }
  if (node.children.length == 1 && node.children[0].name == "li-marker") {
    return node.children[0];
  }
  node.children = node.children.map((it) =>
    modifyOutput(it, sourceConfig, sourceUrl, node)
  );
  if (node.children.some((it) => it.name == "li-marker")) {
    node = {
      name: "li",
      marker: node.children.filter(
        (it) => it.name == "li-marker"
      )[0] as TextNode,
      children: node.children.filter(
        (it) =>
          it.name != "li-marker" &&
          !it.children?.every((c) => c.name == "li-marker")
      ),
    };
    // wrap in ol if single node list
    if (!parent) {
      return {
        name: "ol",
        children: [node],
      };
    }
  }

  node.children = wrapLiElementsInOl(node.children ?? [])
  if (node.name == "a") {
    node.href = `./document?url=${encodeURIComponent(
      makeLinkAbsolute(node.href, sourceUrl)
    )}&sourceConfigId=${sourceConfig._id}`;
  }
  return node;
}


function wrapLiElementsInOl(nodes: RestructuredNode[]): RestructuredNode[] {
	let olElement: RestructuredNode | null = null;
	for(let i = 0; i < nodes.length; i++) {
		const currentNode = nodes[i];
		if (currentNode.name == "li") {
			if (!olElement) {
				olElement = {
					name: "ol",
					children: [] as RestructuredNode[]
				}
			} 
			olElement?.children?.push(currentNode);
			nodes.splice(i, 1);
			i--;
			
		} else {
			if (olElement) {
				nodes.splice(i+1, 0, olElement);
				olElement = null;
			}
		}
	}
	return nodes;

}




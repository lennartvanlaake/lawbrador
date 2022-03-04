import {getTagConfig, ListElementNode, TextNode} from "..";
import type { RestructuredNode } from '..';

const IS_LI_MARKER_REGEX = /^\W\w{1,5}\W$|^\d{1,5}\W?$|^\W$/
const CONTAINS_LI_MARKER_REGEX = /^\W\w{1,5}\W\s|^\d{1,5}\W?\s|^\W\s/

export function detectLiElements(node: RestructuredNode): RestructuredNode {
   const tagConfig = getTagConfig(node.name);
   // matches elements that are displayed as a paragraph (bit of text with margin on top and bottom)
   if (!["paragraph", "container"].includes(tagConfig.type)) return node;
   // checks if this is a li element with no children, in that case take it's marker
   if (node.children!![0].name == "li" && node.children!![0].children?.length == 0) {
	return {
		name: "li",
		children: node.children?.filter(it => it != node.children!![0]),
		marker: node.children!![0].marker
	}
   }
   // get first text child, or first text child of the first children
   const firstChild = "text" in node.children!![0] && node.children!![0].text ? node.children!![0] : node.children!![0].children!![0];
   if ('text' in firstChild && firstChild.text) {
	const isMarkerMatch = firstChild.text.match(IS_LI_MARKER_REGEX);
	if (isMarkerMatch && isMarkerMatch.length > 0) {
		node = addMarker(node, firstChild);
		node.children = node.children?.filter(it => it != node.children!![0]);
		return node;
	} 
	const containsMarkerMatch = firstChild.text.match(CONTAINS_LI_MARKER_REGEX);
	if (containsMarkerMatch && containsMarkerMatch.length > 0) {
		const matchingText = containsMarkerMatch[0].trim();
		const marker: TextNode = { name: "text", children: [], text: matchingText.trim() };
		firstChild.text = firstChild.text.replace(matchingText, "").trim();
		node = addMarker(node, marker)
	}
   }
   return node
}

function addMarker(node: RestructuredNode, marker: TextNode): ListElementNode {
	node = node as ListElementNode;
	node.name = "li";
	node.marker = marker;
	return node;
}


export function wrapLiElementsInOl(node: RestructuredNode): RestructuredNode {
	const children = node?.children ?? [];
	let olElement: RestructuredNode | null = null;
	for(let i = 0; i < children.length; i++) {
		const currentNode = children[i];
		// if this is a list element
		if (currentNode.name == "li") {
			// start a new list if no list is started
			if (!olElement) {
				olElement = {
					name: "ol",
					children: [] as RestructuredNode[]
				}
			}
			// add element to list
			olElement?.children?.push(currentNode);
			// remove element from previous parent
			children.splice(i, 1);
			i--;
			
		} else {
			// when this is not a list element and a list is started
			if (olElement) {
				// add the list element to children and close list
				children.splice(i, 0, olElement);
				olElement = null;
			}
		}
	}
	if (olElement) children.push(olElement); 
	node.children = children;
	return node;

}

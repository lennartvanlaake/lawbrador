import type { DocumentEnricher, Document } from '../document_factory';

import { v4 } from 'uuid';

export const genericEnricher: DocumentEnricher = {
	condition: () => true,
	function: (doc) => {
		addListMarkers(doc);
		addParagraphIds(doc.paragraphs);
		return doc;
	},
};

function addParagraphIds(paragraphs: any[]) {
	paragraphs.forEach((par) => {
		par._id = v4();
	});
}

function addListMarkers(doc: Document) {
	// using array here because I want a reference to the reference of the open list object that I can erase without erasing the open List
	let openListNodes: any[] = [];
	const openListNode = () => openListNodes[0];
	let resultList: any[] = [];
	console.log(doc);
	doc.paragraphs.forEach((node) => {
		if (node.count) {
			if (!openListNode() || openListNode().subtype != 'ol') {
				openListNodes = [
					{
						type: 'list',
						subtype: 'ol',
						children: [],
					},
				];
				resultList.push(openListNode());
			}
			openListNode().children.push(node);
		} else if (node.pre) {
			if (!openListNode() || openListNode().subtype != 'ul') {
				openListNodes = [
					{
						type: 'list',
						subtype: 'ul',
						children: [],
					},
				];
				resultList.push(openListNode());
			}
			openListNode().children.push(node);
		} else {
			openListNodes = [];
			resultList.push(node);
		}
	});
	doc.paragraphs = resultList;
}

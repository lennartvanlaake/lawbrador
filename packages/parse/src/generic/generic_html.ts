import type {
	DocumentEnricher,
	Paragraph,
	Document,
} from '../document_factory';

import { v4 } from 'uuid';

export const genericEnricher: DocumentEnricher = {
	condition: () => true,
	function: (doc) => {
		addListMarkers(doc);
		addParagraphIds(doc.paragraphs);
		return doc;
	},
};

function addParagraphIds(paragraphs: Paragraph[]) {
	paragraphs.forEach((par) => {
		par._id = v4();
	});
}

function addListMarkers(doc: Document) {
	let activeList: string | boolean;
	console.log(doc);
	const addMarker = (markerType: any, position: number) => {
		doc.paragraphs.splice(position, 0, {
			type: 'marker',
			subtype: markerType,
		});
	};
	for (let i = 0; i < doc.paragraphs.length; i++) {
		let par = doc.paragraphs[i];
		if (par.count) {
			if (!activeList) {
				addMarker('ol_start', i);
				i++;
			}
			activeList = 'ol';
		} else if (par.pre) {
			if (!activeList) {
				addMarker('ul_start', i);
				i++;
			}
			activeList = 'ul';
		} else {
			// close list
			if (activeList) {
				addMarker(`${activeList}_end`, i + 1);
				activeList = false;
				i++;
			}
		}
		// check if last element and list is unclosed
		if (i == doc.paragraphs.length - 1 && activeList) {
			addMarker(`${activeList}_end`, i + 1);
			break;
		}
	}
}

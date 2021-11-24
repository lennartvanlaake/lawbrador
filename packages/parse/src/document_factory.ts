import { DocumentUploadInfo } from '@legalthingy/shared/types';
import { genericEnricher } from './generic/generic_html'

export interface DocumentMeta {}

export interface Paragraph {
	_id: string;
}

export interface Document {
	meta: DocumentMeta;
	paragraphs: any[];
	raw: String;
	source: String;
	info: DocumentUploadInfo;
}
export interface DocumentEnricherFunction {
	(doc: Document): Document;
}
export interface DocumentEnricherConidition {
	(doc: Document): boolean;
}

export interface DocumentEnricher {
	function: DocumentEnricherFunction;
	condition: DocumentEnricherConidition;
}

const enrichers: DocumentEnricher[] = [genericEnricher];

export function buildDocument(
	paragraphs: any[],
	info: DocumentUploadInfo,
	raw: String,
	source: String,
) {
	let document: Document = {
		meta: {},
		paragraphs: paragraphs,
		info: info,
		raw: raw,
		source: source,
	};
	enrichers
		.filter((en) => en.condition(document))
		.forEach((en) => (document = en.function(document)));
	return document;
}

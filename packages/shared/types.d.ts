// module extensions

declare module 'cheerio' {
	export interface Node {
		children?: Node[];
		data?: string;
		name?: string;
		attribs?: NodeAttributes;
	}
}

// general interaces
export interface DocumentUploadInfo {
	name: 'eurlex_ecj';
	dataType: 'html';
	documentType: 'judgement';
	jurisdiction: 'EU';
}

export interface NodeAttributes {
	id?: string;
	class?: string;
}

export interface ParsedNode {
	name: string;
	meta: any;
	id?: string;
	class?: string;
	text?: string;
	children?: ParsedNode[];
}

enum SelectionOperator {
	Is,
	Includes,
}

enum SelectionType {
	Body,
}

enum SelectionLocation {
	Tag,
	Class,
	Id,
}

export interface SelectionRule {
	type: SelectionType;
	op: SelectionOperator;
	location: SelectionLocation;
	value: string;
}

// requests

export interface ScrapeRequest {
	url: string;
}

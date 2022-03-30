export interface Header {
	parent: Header | null;
	fullText: string;
	id: string;
	level: number;
	children: Header[];
}

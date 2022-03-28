import type { RestructuredNode } from '@lawbrador/shared';

const HEADER_REGEX = /h\d/;

export function generateHeaderIndex(node: RestructuredNode): RestructuredNode[] {
	const headers: RestructuredNode[] = extractHeaders(node);
	return headers;
}

function extractHeaders(node: RestructuredNode): RestructuredNode[] {
	let output = HEADER_REGEX.test(node.name) ? [node] : [];
	node.children?.forEach((it) => (output = output.concat(extractHeaders(it))));
	return output;
}

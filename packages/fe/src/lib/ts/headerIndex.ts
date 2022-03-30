import type { RestructuredNode } from '@lawbrador/shared';
import { renderText } from '@lawbrador/shared';
import type { Header } from './types';

const HEADER_REGEX = /h\d/;

export function generateHeaderIndex(node: RestructuredNode): Header[] {
	console.log('generating index');
	const headers: Header[] = extractHeaders(node);
	return nest(headers);
}

function extractHeaders(node: RestructuredNode): Header[] {
	let output = HEADER_REGEX.test(node.name) ? [toHeader(node)] : [];
	node.children?.forEach((it) => (output = output.concat(extractHeaders(it))));
	return output;
}

function toHeader(node: RestructuredNode): Header {
	return {
		fullText: renderText(node),
		level: getHeaderLevel(node),
		children: [],
		parent: null,
		id: node.id
	};
}

function nest(headers: Header[]) {
	let previousHeader: Header | null = null;
	for (let i = 0; i < headers.length; i++) {
		const currentHeader = headers[i];
		if (!currentHeader) break;
		currentHeader.parent = previousHeader;
		const firstLowerHeader = getFirstLowerHeader(previousHeader, currentHeader.level);
		if (previousHeader && previousHeader.level < currentHeader.level) {
			previousHeader.children.push(currentHeader);
		} else if (
			previousHeader?.parent &&
			previousHeader.parent.level < currentHeader.level &&
			previousHeader.level == currentHeader.level
		) {
			previousHeader.parent.children.push(currentHeader);
		} else if (firstLowerHeader) {
			firstLowerHeader.children.push(currentHeader);
		} else {
			previousHeader = currentHeader;
			continue;
		}
		previousHeader = currentHeader;
		headers.splice(i, 1);
		i--;
	}
	return headers;
}

function getHeaderLevel(node: RestructuredNode) {
	try {
		return parseInt(node.name.charAt(1));
	} catch (e) {
		return Number.MAX_VALUE;
	}
}

function getFirstLowerHeader(parentHeader: Header | null, currentLevel: number) {
	if (!parentHeader) return null;
	if (parentHeader.level < currentLevel) return parentHeader;
	return getFirstLowerHeader(parentHeader.parent, currentLevel);
}

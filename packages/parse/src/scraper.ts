import cheerio, { Node, CheerioAPI } from 'cheerio';
import axios from 'axios';
import { ParsedNode } from '@legalthingy/shared/schemas/document_version';

interface NodeAttributes {
	id?: string;
	class?: string;
	href?: string;
}

declare module 'cheerio' {
	export interface Node {
		children?: Node[];
		data?: string;
		name?: string;
		attribs?: NodeAttributes;
	}
}

function extractDataRecursive(node: Node, $: CheerioAPI, output: ParsedNode) {
	// get the full text of a link, ignoring further sub-elements
	if (node.attribs?.href) {
		output.data.push({
			href: node.attribs.href,
			text: $(node).text(),
		});
		return;
	} else if (node.data) {
		output.data.push({
			text: node.data,
		});
	}
	if (node.children) {
		node.children.forEach((c) =>
			extractDataRecursive(c, $, output),
		);
	}
}

function getTextNodes(node: Node, $: CheerioAPI): ParsedNode {
	let output: ParsedNode = {
		meta: {},
		chain: [
			{
				name: node.name,
				id: node.attribs?.id,
				class: node.attribs?.class,
			},
		],
		data: [],
		children: null,
	};

	// empty text nodes do not count
	node.children = node.children?.filter(
		(c) => !(c.type == 'text' && c.data.trim() == ''),
	);

	if (!node.children) {
		return null;
	}
	if (node.children.some((child) => child?.type == 'text')) {
		extractDataRecursive(node, $, output);
		return output;
	}
	// flatten organisation nodes with only other organisation node as child
	if (node.children.length == 1) {
		let childOutput = getTextNodes(node.children[0], $);
		if (!childOutput) {
			return null;
		}
		childOutput.chain.push({
			name: node.name,
			id: node.attribs?.id,
			class: node.attribs?.class,
		});
		return childOutput;
	}

	// output has multiple children
	output.children = node.children
		.map((child) => getTextNodes(child, $))
		.filter(
			(child) =>
				child != null &&
				(child.data.length != 0 || child.children),
		);

	// organisation with no children that have text should be ignored
	if (output.children?.length == 0) return null;
	return output;
}

export function parse(html: string): ParsedNode {
	const $ = cheerio.load(html);
	return getTextNodes($('body')[0], $);
}

export async function scrape(url: string): Promise<ParsedNode> {
	const body = await axios.get(url);
	return parse(body.data);
}

import cheerio, { Node, CheerioAPI } from 'cheerio';
import axios from 'axios';
import { ParsedNode } from '@legalthingy/shared';

function getTextNodes(node: Node, $: CheerioAPI): ParsedNode {
	const output: ParsedNode = {
		meta: {},
		name: node.name,
		id: node.attribs?.id,
		class: node.attribs?.class,
		text: null,
		children: null,
	};

	if (!node.children) {
		return null;
	}
	if (
		node.children.some(
			(child) =>
				child?.type == 'text' &&
				child?.data.trim()?.length > 0,
		)
	) {
		output.text = $(node).text();
		return output;
	}
	output.children = node.children
		.map((child) => getTextNodes(child, $))
		.filter(
			(child) =>
				child != null && (child.text || child.children),
		);
	if (output.children?.length == 0) return null;
	return output;
}

export async function scrape(url: string): Promise<ParsedNode> {
	const body = await axios.get(url);
	const $ = cheerio.load(body.data);
	return getTextNodes($('body')[0], $);
}

import cheerio, { Node, CheerioAPI } from 'cheerio';
import axios from 'axios';
import { ParsedNode } from 'packages/shared/src/schemas/scrape';
import {ScrapeResult} from './schemas/scrape';

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

function parseNode(node: Node, $: CheerioAPI): ParsedNode {
	let output: ParsedNode = {
		chain: [
			{
				name: node.name,
				id: node.attribs?.id,
				class: node.attribs?.class,
			},
		],
	};

	// if a link get the entire text of all the children of the node, otherwise just get the text 
	if (node.attribs?.href) {
		output.href = node.attribs.href;
		output.text = $(node).text()?.trim();
	} else {
		output.text = node.data?.trim()
	}
	
	// flatten organisation nodes with only other organisation node as child
	if (node.children?.length == 1) {
		let childOutput = parseNode(node.children[0], $);
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

	// apply recursively to children
	output.children = node.children?.map((child) => parseNode(child, $))
		.filter(it => it);

	// if there is neither non-whitespace text nor children then ignore the node
	if (output.children?.length == 0 && !output.text) return null;
	return output;
}

export function parse(html: string): ParsedNode {
	const $ = cheerio.load(html);
	return parseNode($('body')[0], $);
}

export async function scrape(url: string, hash: string): Promise<ScrapeResult> {
	const body = await axios.get(url);
	return {
		url: url,
		hash: hash,
		body: parse(body.data)
	};
}

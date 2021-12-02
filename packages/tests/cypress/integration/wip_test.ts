import cheerio, { Node, CheerioAPI } from 'cheerio';
//import { text as tfeuText } from '../../fixtures/tfeu';
//import { text as eurlexText } from '../../fixtures/eurlex-cjeu';
//import { text as nlText } from '../../fixtures/wet-natuurbescherming';

interface NodeAttributes {
	id?: string;
	class?: string;
	href?: string;
}

interface NodeProperties {
	name: string;
	id?: string;
	class?: string;
}

interface NodeLink {
	href: string;
	text: string;
}

interface ParsedNode {
	meta: any;
	chain: NodeProperties[];
	children?: ParsedNode[];
	links?: NodeLink[];
	text?: string;
}

declare module 'cheerio' {
	interface Node {
		children?: Node[];
		data?: string;
		name?: string;
		attribs?: NodeAttributes;
	}
}


function extractDataRecursive(node: Node, $: CheerioAPI, output: ParsedNode) {
	if (node.data) {
		output.text += node.data;
	}
	if (node.attribs?.href) {
		output.links.push({
			href: node.attribs.href,
			text: $(node).text(),
		});
	}
	if (node.children) {
		node.children.forEach((c) =>
			extractDataRecursive(c, $, output),
		);
	}
}

function getTextNodes(node: Node, $: CheerioAPI): any {
	let output: ParsedNode = {
		meta: {},
		chain: [
			{
				name: node.name,
				id: node.attribs?.id,
				class: node.attribs?.class,
			},
		],
		text: '',
		links: [],
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
				child != null && (child.text || child.children),
		);

	// organisation with no children that have text should be ignored
	if (output.children?.length == 0) return null;
	return output;
}

describe('WIP', () => {
	it('wippin', () => {
		//const $ = cheerio.load(nlText);
		//const body = $('body');
		//const parsed = body
			//.toArray()
			//.flatMap((el) => getTextNodes(el, $));
		//console.log(parsed);
	});
});

import cheerio, { Node, CheerioAPI } from 'cheerio';
import { text as tfeuText } from '../../fixtures/tfeu';
import { text as eurlexText } from '../../fixtures/eurlex-cjeu';
import { text as nlText } from '../../fixtures/wet-natuurbescherming';

interface NodeAttributes {
	id?: string;
	class?: string;
}

declare module 'cheerio' {
	interface Node {
		children?: Node[];
		data?: string;
		name?: string;
		attribs?: NodeAttributes;
	}
}

function getTextNodes(rootChildren: Node[], $: CheerioAPI): any {
	return rootChildren
		.map((child) => getTextChildren(child, $))
		.filter((list) => list);
}

function getTextChildren(node: Node, $: CheerioAPI): any {
	const output = {
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
			(child) => child?.type == 'text' && child?.data.trim(),
		)
	) {
		output.text = $(node).text();
		return output;
	}

	//if (node.name == 'table') {
	//console.log('hi');
	//}
	output.children = node.children
		.map((child) => getTextChildren(child, $))
		.filter(
			(child) =>
				child != null && (child.text || child.children),
		);
	if (output.children.length == 0) return null;
	return output;
}

describe('WIP', () => {
	it('wippin', () => {
		const $ = cheerio.load(nlText);
		const bodyChildren = $('body').children();
		const parsed = getTextNodes(bodyChildren.toArray(), $);
		console.log(parsed);
		expect(1).to.gt(0);
	});
});

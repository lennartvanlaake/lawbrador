import cheerio, { Node, CheerioAPI } from 'cheerio';
import { text as tfeuText } from '../../fixtures/tfeu';
import { text as eurlexText } from '../../fixtures/eurlex-cjeu';
import { text as nlText } from '../../fixtures/wet-natuurbescherming';

interface NodeAttributes {
	id?: string;
	class?: string;
}

interface ParsedNode {
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

interface SelectionRule {
	type: SelectionType;
	op: SelectionOperator;
	location: SelectionLocation;
	value: string;
}

const selRule = {
	type: SelectionType.Body,
	op: SelectionOperator.Includes,
	location: SelectionLocation.Class,
	value: 'wetgeving',
};

declare module 'cheerio' {
	interface Node {
		children?: Node[];
		data?: string;
		name?: string;
		attribs?: NodeAttributes;
	}
}

function ruleApplyer(nodes: ParsedNode[], rule: SelectionRule): ParsedNode[] {
	nodes.forEach((child) => ruleApplyerInner(child, rule, []));
	return nodes;
}

function ruleApplyerInner(
	node: ParsedNode,
	rule: SelectionRule,
	chain: ParsedNode[],
) {
	chain.push(node);
	node.meta.hide = !chain.some((parent) => {
		return parent.class?.includes(rule.value);
	});
	node.children?.forEach((child) => {
		ruleApplyerInner(child, rule, chain);
	});
}

function getTextNodes(node: Node, $: CheerioAPI): ParsedNode {
	const output = {
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

function recursivePrint(parsedNode: ParsedNode) {
	if (!parsedNode.meta.hide && parsedNode.text) {
		console.log(parsedNode.text);
	}
	parsedNode.children?.forEach((c) => recursivePrint(c));
}

describe('WIP', () => {
	it('wippin', () => {
		const $ = cheerio.load(nlText);
		const body = $('body');
		const parsed = body
			.toArray()
			.flatMap((el) => getTextNodes(el, $));
		const ruled = ruleApplyer(parsed, selRule);
		console.log(ruled);
		ruled.forEach((n) => recursivePrint(n));
		expect(1).to.gt(0);
	});
});

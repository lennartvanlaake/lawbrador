import type { ParsedNode, SelectionRule } from '..';

export function matches(node: ParsedNode, rule: SelectionRule): boolean {
	if (!node) return false;
	let toMatch: Array<string>;
	switch (rule.location) {
		case 'id':
			toMatch = node.ids;
		 	break;
		case 'tag':
			toMatch = node.tags;
		 	break;
		case 'class':
			toMatch = node.classes;
		 	break;
		case 'text':
			toMatch = node.text ? [ node.text ] : [];
		 	break;
		case 'link':
			toMatch = node.href ? [ node.href ] : [];
		 	break;
	}
	if (!toMatch) return false;
	switch (rule.op) {
		case 'is':
			return toMatch.includes(rule.value);
		case 'includes':
			return toMatch.some(it => it.includes(rule.value));
		case 'regex':
			const re = new RegExp(rule.value)
			return toMatch.some(it => re.test(it));
	}
}

function matchesAll(node: ParsedNode, rules: SelectionRule[]): boolean {
	//@ts-ignore silly too deep type thing
	return rules.every(r => matches(node, r));
}

export function getFirstMatching(
	node: ParsedNode,
	...rules: Array<SelectionRule | undefined>
): ParsedNode | null {
	rules = rules.filter(it => it);
	if (rules.length == 0 || matchesAll(node, rules as SelectionRule[])) {
		return node;
	}
	if (!node || !node.children) {
		return null;
	}
	for (let i = 0; i < node.children.length; i++) {
		const child = node.children[i];
		const result = getFirstMatching(child, ...rules);
		if (result) {
			return result;
		}
	}
	return null;
}

export function getAllMatching(
	node: ParsedNode,
	...rules: Array<SelectionRule | undefined>
): ParsedNode[] {
	rules = rules.filter(it => it);
	let result: ParsedNode[] = [];
	if (matchesAll(node, rules as SelectionRule[])) {
		result.push(node);
	}
	if (node.children) {
		const matchedChildren = node.children.flatMap((c) =>
			getAllMatching(c, ...rules),
		);
		result = result.concat(matchedChildren);
	}
	return result;
}

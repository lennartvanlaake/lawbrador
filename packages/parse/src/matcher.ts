import { ParsedNode } from '@legalthingy/shared/schemas/document_version';
import {
	SelectionRule,
	SelectionLocation,
	SelectionOperator,
} from '@legalthingy/shared/schemas/rules';

export function matches(node: ParsedNode, rule: SelectionRule): boolean {
	let toMatch = '';
	switch (+rule.location) {
		case SelectionLocation.Id:
			toMatch = node.id;
			break;
		case SelectionLocation.Tag:
			toMatch = node.name;
			break;
		case SelectionLocation.Class:
			toMatch = node.class;
			break;
	}
	if (!toMatch) return false;
	switch (rule.op) {
		case SelectionOperator.Is:
			return toMatch == rule.value;
		case SelectionOperator.Includes:
			return toMatch.includes(rule.value);
	}
}

export function getFirstMatching(
	node: ParsedNode,
	rule: SelectionRule,
): ParsedNode {
	if (matches(node, rule)) {
		return node;
	}
	if (!node.children) {
		return null;
	}
	for (let i = 0; i < node.children.length; i++) {
		const child = node.children[i];
		const textRootChild = getFirstMatching(child, rule);
		if (textRootChild) {
			return textRootChild;
		}
	}
}

export function getAllMatching(node: ParsedNode, rule: SelectionRule): ParsedNode[] {
	if (matches(node, rule)) {
		return [node];
	}
	if (!node.children) {
		return [];
	}
	return node.children.flatMap((c) => getAllMatching(c, rule))
}

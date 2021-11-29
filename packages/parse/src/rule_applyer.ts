import {
	DocumentVersion,
	ParsedNode,
} from '@legalthingy/shared/schemas/document_version';
import {
	RuleSet,
	SelectionRule,
	SelectionLocation,
	SelectionOperator,
} from '@legalthingy/shared/schemas/rules';

function matches(node: ParsedNode, rule: SelectionRule): boolean {
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

function getTextRootNode(node: ParsedNode, rules: RuleSet): ParsedNode {
	if (matches(node, rules.bodyRule)) {
		return node;
	}
	if (!node.children) {
		return null;
	}
	for (let i = 0; i < node.children.length; i++) {
		const child = node.children[i];
		if (getTextRootNode(child, rules)) {
			return child;
		}
	}
}

export function applyRuleSet(
	doc: DocumentVersion,
	rules: RuleSet,
): DocumentVersion {
	doc.appliedRules = rules;
	if (rules.bodyRule) {
		doc.textRootNode = getTextRootNode(doc.bodyNode, rules);
	}
	return doc;
}

import {
	ParsedNode,
	ParsedNodeData,
	RestructuredNode,
} from '@legalthingy/shared/schemas/document_version';
import {
	DocumentRuleSet,
	SourceSiteConfig,
} from '@legalthingy/shared/schemas/rules';
import { getFirstMatching } from './matcher';

export function applyConfig(
	root: ParsedNode,
	config: SourceSiteConfig,
): RestructuredNode[] {
	const ruleSet = selectRuleSet(root, config);
	return applyRuleSet(root, ruleSet);
}

export function selectRuleSet(
	root: ParsedNode,
	config: SourceSiteConfig,
): DocumentRuleSet {
	let applicableRuleset: DocumentRuleSet;
	for (let i = 0; i < config.documentRuleSets.length; i++) {
		const ruleSet = config.documentRuleSets[i];
		const matches =
			ruleSet.conditionRules.every((rs) => {
				return getFirstMatching(root, rs);
			}) && getFirstMatching(root, ruleSet.bodyRule);
		if (matches) {
			applicableRuleset = ruleSet;
			break;
		}
	}
	return applicableRuleset;
}

export function applyRuleSet(
	root: ParsedNode,
	rules: DocumentRuleSet,
): RestructuredNode[] {
	if (!rules) {
		return restructure(root);
	}
	let result = root;
	if (rules.bodyRule) {
		result = getFirstMatching(root, rules.bodyRule);
	}
	return restructure(result);
}

function restructure(root: ParsedNode): RestructuredNode[] {
	return root.children.map((c) => restructureRecursive(c));
}

function restructureRecursive(node: ParsedNode): RestructuredNode {
	if (!node.children || node.children.length == 0) {
		return {
			name: 'p',
			children: node.data.map((c) => restructureNodeData(c)),
		};
	} else if (node.children.length == 1) {
		return restructureRecursive(node.children[0]);
	} else {
		return {
			name: 'div',
			children: node.children.map((c) =>
				restructureRecursive(c),
			),
		};
	}
}

function restructureNodeData(data: ParsedNodeData): RestructuredNode {
	if (data.href) {
		return {
			name: 'a',
			href: data.href,
			text: data.text,
		};
	} else {
		return {
			text: data.text,
		};
	}
}

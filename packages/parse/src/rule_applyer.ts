import { DocumentVersion } from '@legalthingy/shared/schemas/document_version';
import {
	DocumentRuleSet,
	SourceSiteConfig,
} from '@legalthingy/shared/schemas/rules';
import { getFirstMatching } from './matcher';

export function applyConfig(
	doc: DocumentVersion,
	config: SourceSiteConfig,
): DocumentVersion {
	let applicableRuleset: DocumentRuleSet;
	for (let i = 0; i < config.documentRuleSets.length; i++) {
		const ruleSet = config.documentRuleSets[i];
		const matches = ruleSet.conditionRules.every((rs) => {
			return getFirstMatching(doc.textRootNode, rs);
		});
		if (matches) {
			applicableRuleset = ruleSet;
			break;
		}
	}
	return applyRuleSet(doc, applicableRuleset);
}

export function applyRuleSet(
	doc: DocumentVersion,
	rules: DocumentRuleSet,
): DocumentVersion {
	if (!rules) return doc;
	doc.appliedRules = rules;
	if (rules.bodyRule) {
		doc.textRootNode = getFirstMatching(
			doc.bodyNode,
			rules.bodyRule,
		);
	} else {
		doc.textRootNode = doc.bodyNode;
	}
	return doc;
}

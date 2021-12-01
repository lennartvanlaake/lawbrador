import {
	DocumentVersion,
} from '@legalthingy/shared/schemas/document_version';
import {
	DocumentRuleSet,
} from '@legalthingy/shared/schemas/rules';
import {  getFirstMatching } from './matcher';


export function applyRuleSet(
	doc: DocumentVersion,
	rules: DocumentRuleSet,
): DocumentVersion {
	doc.appliedRules = rules;
	if (rules.bodyRule) {
		doc.textRootNode = getFirstMatching(doc.bodyNode, rules.bodyRule);
	} else {
		doc.textRootNode = doc.bodyNode;
	}
	return doc;
}

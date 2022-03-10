import type { DocumentRuleSet, ParsedNode, SourceSiteConfig } from '..';
import { getFirstMatching, Errors } from '..';

export function selectRuleSet(
	root: ParsedNode,
	config: SourceSiteConfig
): DocumentRuleSet | undefined {
	for (let i = 0; i < config.documentRuleSets.length; i++) {
		const ruleSet = config.documentRuleSets[i];
		const matchesConditions = getFirstMatching(root, ...(ruleSet.conditionRules ?? []));
		const matchesBody = ruleSet.bodyRule && getFirstMatching(root, ruleSet.bodyRule!);
		if (matchesConditions && matchesBody) {
			return ruleSet;
		}
	}
	//@ts-ignore
	const emptyRuleSet = config.documentRuleSets.filter(
		(it) => !it.bodyRule && (!it.conditionRules || it.conditionRules.length == 0)
	)[0];
	if (emptyRuleSet) {
		return emptyRuleSet;
	}
	throw new Error(Errors.NO_RULESET_MATCHED);
}

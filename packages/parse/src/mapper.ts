import { DocumentUploadInfo } from 'packages/shared/types';
import { SplitResult } from './splitter';
import { Element, CheerioAPI } from 'cheerio';
import * as eurlexGeneralHtml from './eurlex/general_html';
import * as eurlexEcjHtml from './eurlex/ecj_html';

export interface MappingRulesetCondition {
	(info: DocumentUploadInfo): boolean;
}

export interface HtmlMappingContext {
	$: CheerioAPI;
	currentHeader: any;
	result: any[];
}

export interface HtmlMappingRuleAction {
	(element: Element, context: HtmlMappingContext);
}

export interface HtmlMappingRuleCondition {
	(element: Element, context: HtmlMappingContext): boolean;
}

export interface HtmlMappingRule {
	condition: HtmlMappingRuleCondition;
	action: HtmlMappingRuleAction;
}

export interface MappingRuleset {
	condition: MappingRulesetCondition;
	rules: HtmlMappingRule[];
}

const mappingRules: MappingRuleset[] = [
	eurlexGeneralHtml.ruleset,
	eurlexEcjHtml.ruleset,
];

export function map(splitResult: SplitResult, info: DocumentUploadInfo): any[] {
	const applicableRules = mappingRules
		.filter((rs) => rs.condition(info))
		.map((rs) => rs.rules)
		.flat();
	const context = {
		$: splitResult.$,
		result: [],
		currentHeader: [],
	};
	splitResult.children.each((_, el) => {
		// using for-loop here beacuse might want to have early return
		for (let i = 0; i < applicableRules.length; i++) {
			const rule = applicableRules[i];
			if (rule.condition(el, context)) {
				rule.action(el, context);
			}
		}
	});
	return context.result;
}

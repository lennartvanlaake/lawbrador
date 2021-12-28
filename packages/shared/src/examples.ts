import {
	DocumentRuleSet,
	SelectionRule,
	SourceSiteConfig,
} from './schemas/rules';
import { v4 } from 'uuid';
export const DEFAULT_EMPTY_CONFIG: SelectionRule = {
	op: 'is',
	location: 'id',
	value: '',
};
export const newEmptyRuleSet: () => DocumentRuleSet = () => ({
	id: v4(),
	conditionRules: [],
});
// hard coded for now
export const eurlexConfig: SourceSiteConfig = {
	id: '1',
	name: 'eurlex-test-config',
	searchUrlConfig: {
		base: 'https://eur-lex.europa.eu',
		pathComponents: [
			{
				value: 'search.html',
			},
		],
		queryComponents: {
			scope: {
				value: 'EURLEX',
			},
			text: {
				variableName: 'query',
			},
			DTS_SUBDOM: {
				variableName: 'domain',
				possibleValues: [
					{
						value: 'LEGISLATION',
						displayName: 'Legislation',
					},
					{
						value: 'EU_CASE_LAW',
						displayName: 'EU case law',
					},
				],
			},

			type: {
				value: 'quick',
			},
			page: {
				variableName: 'page',
			},
		},
	},
	documentUrlConfig: {
		base: 'https://eur-lex.europa.eu',
		pathComponents: [
			{
				value: 'legal-content',
			},
			{
				value: 'AUTO',
			},
		],
		queryComponents: {
			uri: {
				variableName: 'celex',
			},
		},
	},

	documentRuleSets: [
		{
			id: '1',
			conditionRules: [],
			bodyRule: {
				op: 'is',
				location: 'id',
				value: 'TexteOnly',
			},
		},

		{
			id: '2',
			conditionRules: [],
			bodyRule: {
				op: 'is',
				location: 'id',
				value: 'textTabContent',
			},
		},
	],
	htmlSearchRuleSet: {
		queryVariable: 'query',
		pageVariable: 'page',
		resultListRule: {
			op: 'is',
			location: 'class',
			value: 'EurlexContent',
		},
		resultRule: {
			op: 'is',
			location: 'class',
			value: 'SearchResult',
		},
		resultLinkRule: {
			op: 'is',
			location: 'tag',
			value: 'h2',
		},
	},
};

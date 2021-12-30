import {
	DocumentRuleSet,
	SelectionRule,
	SourceSiteConfig,
	UrlComponent,
	ValueWithDisplayName,
} from './schemas/rules';

export const EMPTY_URL_COMPONENT: UrlComponent = {
	value: '',
	variableName: null,
	possibleValues: [],
};
export const EMPTY_VALUE_WITH_DISPLAY_NAME: ValueWithDisplayName = {
	value: '',
	displayName: null,
};
export const DEFAULT_EMPTY_SELECTION_RULE: SelectionRule = {
	op: 'is',
	location: 'id',
	value: '',
};
export const DEFAULT_EMPTY_RULESET: DocumentRuleSet = {
	conditionRules: [],
};
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
				variableName: null,
			},
			text: {
				variableName: 'query',
				value: null,
			},
			DTS_SUBDOM: {
				value: null,
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
				variableName: null,
			},
			page: {
				variableName: 'page',
				value: null,
			},
		},
	},
	documentUrlConfig: {
		base: 'https://eur-lex.europa.eu',
		pathComponents: [
			{
				value: 'legal-content',
				variableName: null,
			},
			{
				value: 'AUTO',
				variableName: null,
			},
		],
		queryComponents: {
			uri: {
				variableName: 'celex',
				value: null,
			},
		},
	},

	documentRuleSets: [
		{
			conditionRules: [],
			bodyRule: {
				op: 'is',
				location: 'id',
				value: 'TexteOnly',
			},
		},

		{
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

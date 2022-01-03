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
export const EMPTY_SOURCE_CONFIG: SourceSiteConfig = {
	name: '',
	searchUrlConfig: {
		base: 'https://',
		pathComponents: [],
		queryComponents: {},
	},
	documentUrlConfig: {
		base: 'https://',
		pathComponents: [],
		queryComponents: {},
	},

	documentRuleSets: [],
	htmlSearchRuleSet: {
		queryVariable: 'query',
		pageVariable: 'page',
		resultListRule: {
			...DEFAULT_EMPTY_SELECTION_RULE,
		},
		resultRule: {
			...DEFAULT_EMPTY_SELECTION_RULE,
		},
		resultLinkRule: {
			...DEFAULT_EMPTY_SELECTION_RULE,
		},
	},
};

// hard coded for now
export const eurlexConfig: SourceSiteConfig = {
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

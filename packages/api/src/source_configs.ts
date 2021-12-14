import { SourceSiteConfig } from '@legalthingy/shared/schemas/rules';
import type { FastifyPluginAsync } from 'fastify';

export function getSourceConfigById(id: string): SourceSiteConfig {
	return eurlexDemoConfig;
}
// hard coded for now
const eurlexDemoConfig: SourceSiteConfig = {
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
				possibleValues: ['LEGISLATION', 'EU_CASE_LAW'],
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

export const sourceConfigRoutes: FastifyPluginAsync = async (
	fastify,
	_options,
) => {
	fastify.get('/api/sources', {}, async () => {
		return [eurlexDemoConfig];
	});
};

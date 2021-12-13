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
				static: true,
			},
		],
		queryComponents: {
			scope: {
				value: 'EURLEX',
				static: true,
			},
			text: {
				value: 'query',
				static: false,
			},
			lang: {
				value: 'en',
				static: true,
			},
			type: {
				value: 'quick',
				static: true,
			},
		},
	},
	documentUrlConfig: {
		base: 'https://eur-lex.europa.eu',
		pathComponents: [
			{
				value: 'legal-content',
				static: true,
			},
			{
				value: 'AUTO',
				static: true,
			},
		],
		queryComponents: {
			uri: {
				value: 'id',
				static: false,
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

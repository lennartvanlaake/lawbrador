import {
	SelectionLocation,
	SelectionOperator,
	SourceSiteConfig,
} from '@legalthingy/shared/schemas/rules';
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
				op: SelectionOperator.Is,
				location: SelectionLocation.Id,
				value: 'TexteOnly',
			},
		},

		{
			id: '2',
			conditionRules: [],
			bodyRule: {
				op: SelectionOperator.Is,
				location: SelectionLocation.Id,
				value: 'textTabContent',
			},
		},
	],
	htmlSearchRuleSet: {
		resultListRule: {
			op: SelectionOperator.Is,
			location: SelectionLocation.Class,
			value: 'EurlexContent',
		},
		resultRule: {
			op: SelectionOperator.Is,
			location: SelectionLocation.Class,
			value: 'SearchResult',
		},
		resultLinkRule: {
			op: SelectionOperator.Is,
			location: SelectionLocation.Tag,
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

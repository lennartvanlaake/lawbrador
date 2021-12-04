import {
	SelectionLocation,
	SelectionOperator,
	SourceSiteConfig,
} from '@legalthingy/shared/schemas/rules';
import type { FastifyPluginAsync } from 'fastify';

// hard coded for now
const eurlexDemoConfig: SourceSiteConfig = {
	name: 'eurlex-test-config',
	baseUrl: 'https://eur-lex.europa.eu',
	documentRuleSets: [
		{
			conditionRules: [
				{
					op: SelectionOperator.Is,
					location: SelectionLocation.Id,
					value: 'TexteOnly',
				},
			],
			bodyRule: {
				op: SelectionOperator.Is,
				location: SelectionLocation.Id,
				value: 'TexteOnly',
			},
		},

		{
			conditionRules: [
				{
					op: SelectionOperator.Is,
					location: SelectionLocation.Id,
					value: 'textTabContent',
				},
			],
			bodyRule: {
				op: SelectionOperator.Is,
				location: SelectionLocation.Id,
				value: 'textTabContent',
			},
		},
	],
	htmlSearchRuleSet: {
		pathWithVariables:
			'/search.html?scope=EURLEX&type=quick&text=$search',
		inputVariables: ['$search'],
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

import { search } from '@legalthingy/parse/src/searcher';
import {
	SelectionLocation,
	SelectionOperator,
	SourceSiteConfig,
} from '@legalthingy/shared/schemas/rules';

describe('Test searching', () => {
	const config: SourceSiteConfig = {
		name: 'eurlex-test-config',
		baseUrl: 'https://eur-lex.europa.eu',
		documentRuleSets: [],
		htmlSearchRuleSet: {
			pathWithVariables:
				'/search.html?scope=EURLEX&type=quick&text=$search',
			inputVariables: ['$search'],
			resultBodyRule: {
				op: SelectionOperator.Is,
				location: SelectionLocation.Class,
				value: 'EurlexContent',
			},
			resultRule: {
				op: SelectionOperator.Is,
				location: SelectionLocation.Tag,
				value: 'h2',
			},
		},
	};

	it('Search result works', async () => {
		const result = await search(config, { $search: 'van gendt' });
		expect(result).to.not.eq(null);
	});
});

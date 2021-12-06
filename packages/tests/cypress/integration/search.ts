import { parseSearchResults } from '@legalthingy/parse/src/searcher';
import { parse } from '@legalthingy/parse/src/scraper';
import {
	SelectionLocation,
	SelectionOperator,
	HtmlSearchRuleSet,
} from '@legalthingy/shared/schemas/rules';

describe('Test searching', () => {
	const demoHtml = `
		<div><script>randomstuff</script></div>
		<div class='EurlexContent'>
			<div class='SearchResult'>
				<h2><a href='./legalcontentsomething'>casename</a><h2>
			</div>
		</div>
	`;
	const eurlexRules: HtmlSearchRuleSet = {
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
	};

	it('Parsing search results works for eurlex', async () => {
		const parsed = parse(demoHtml);
		console.log(parsed);
		const result = parseSearchResults(parsed, eurlexRules);
		console.log(result);
		expect(result[0].link).to.be.ok;
		expect(result[0].text).to.be.ok;
	});
});

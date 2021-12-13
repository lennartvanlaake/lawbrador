import { parseSearchResults } from '@legalthingy/parse/src/searcher';
import { parse } from '@legalthingy/parse/src/scraper';
import { HtmlSearchRuleSet } from '@legalthingy/shared/schemas/rules';

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
		pageVariable: '',
		queryVariable: '',
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

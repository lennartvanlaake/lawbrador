import { parseSearchResults } from '@lawbrador/parse/src/searcher';
import { parse } from '@lawbrador/parse/src/scraper';
import { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';

describe('Test searching', () => {
	const demoHtml = `
		<div><script>randomstuff</script></div>
		<div class='EurlexContent'>
			<div class='SearchResult'>
				<h2><a href='./legalcontentsomething'>casename</a><h2>
			</div>
		</div>
	`;
	const config: SourceSiteConfig = {
		id: 'test',
		name: 'test',
		searchUrlConfig: {
			base: 'http://text.com',
			pathComponents: [],
			queryComponents: {},
		},
		documentUrlConfig: {
			base: 'http://text.com',
			pathComponents: [],
			queryComponents: {},
		},
		documentRuleSets: [],
		htmlSearchRuleSet: {
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
		},
	};

	it('Parsing search results works for eurlex', () => {
		const parsed = parse(demoHtml);
		console.log(parsed);
		const result = parseSearchResults(parsed, config);
		console.log(result);
		expect(result[0].href).to.be.ok;
		expect(result[0].text).to.be.ok;
	});
});

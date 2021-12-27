"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searcher_1 = require("./searcher");
const scraper_1 = require("./scraper");
const chai_1 = require("chai");
describe('Test searching', () => {
    const demoHtml = `
		<div><script>randomstuff</script></div>
		<div class='EurlexContent'>
			<div class='SearchResult'>
				<h2><a href='./legalcontentsomething'>casename</a><h2>
			</div>
		</div>
	`;
    const config = {
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
        const parsed = (0, scraper_1.parse)(demoHtml);
        const result = (0, searcher_1.parseSearchResults)(parsed, config);
        (0, chai_1.expect)(result[0].href).to.be.ok;
        (0, chai_1.expect)(result[0].text).to.be.ok;
    });
});
describe('Incrementing the page number', () => {
    const config = {
        pageVariable: 'page',
        queryVariable: '',
        resultListRule: {
            op: 'is',
            location: 'class',
            value: '',
        },
        resultRule: {
            op: 'is',
            location: 'class',
            value: '',
        },
        resultLinkRule: {
            op: 'is',
            location: 'tag',
            value: '',
        },
    };
    it('goes to the second page if no page number is provided', () => {
        const result = (0, searcher_1.incrementPageNumber)({}, config);
        (0, chai_1.expect)(result[config.pageVariable]).to.eq('2');
    });
    it('goes to the third page if page number 2 is provided', () => {
        const result = (0, searcher_1.incrementPageNumber)({ page: '2' }, config);
        (0, chai_1.expect)(result[config.pageVariable]).to.eq('3');
    });
    it('throws if a non-numeric page number is provided', () => {
        (0, chai_1.expect)(() => (0, searcher_1.incrementPageNumber)({ page: 'blabla' }, config)).to
            .throw;
    });
});
//# sourceMappingURL=searcher.spec.js.map
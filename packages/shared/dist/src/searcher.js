import { getFirstMatching, getAllMatching } from './matcher';
import { scrape } from './scraper';
import { buildUrl, hashUrlVariables } from 'packages/shared/src/url';
export async function search(searchInput, config) {
    const url = buildUrl(searchInput, config.searchUrlConfig);
    console.log(`URL :${url}`);
    const scrapeResult = await scrape(url);
    return parseSearchResults(scrapeResult, config);
}
export function incrementPageNumber(searchInput, config) {
    const pageVariableName = config.pageVariable;
    let lastPageValue = searchInput[pageVariableName];
    let pageNumber;
    if (!lastPageValue) {
        pageNumber = 2;
    }
    else {
        let lastPageNumber = parseInt(lastPageValue);
        if (Number.isNaN(lastPageNumber)) {
            throw Error(`cannot parse ${searchInput[pageVariableName]} to a number`);
        }
        pageNumber = lastPageNumber + 1;
    }
    searchInput[pageVariableName] = pageNumber.toString();
    return searchInput;
}
export function parseSearchResults(root, config) {
    const base = getFirstMatching(root, config.htmlSearchRuleSet.resultListRule);
    if (!base) {
        throw new Error('Could not find result list in html');
    }
    const searchResult = getAllMatching(base, config.htmlSearchRuleSet.resultRule);
    const links = searchResult
        .map((el) => getFirstMatching(el, config.htmlSearchRuleSet.resultLinkRule))
        .filter((el) => { var _a; return el.data && ((_a = el.data) === null || _a === void 0 ? void 0 : _a.length) > 0; })
        .map((el) => {
        const url = makeLinkAbsolute(el.data[0].href, config.documentUrlConfig);
        return {
            text: el.data[0].text,
            href: url,
            hash: hashUrlVariables(url, config.documentUrlConfig),
        };
    });
    return links;
}
function makeLinkAbsolute(link, config) {
    const path = link[0] == '.' ? link.substring(1) : link;
    return config.base + path;
}
//# sourceMappingURL=searcher.js.map
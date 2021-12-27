"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSearchResults = exports.incrementPageNumber = exports.search = void 0;
const matcher_1 = require("./matcher");
const scraper_1 = require("./scraper");
const url_1 = require("./url");
async function search(searchInput, config) {
    const url = (0, url_1.buildUrl)(searchInput, config.searchUrlConfig);
    console.log(`URL :${url}`);
    const scrapeResult = await (0, scraper_1.scrape)(url);
    return parseSearchResults(scrapeResult, config);
}
exports.search = search;
function incrementPageNumber(searchInput, config) {
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
exports.incrementPageNumber = incrementPageNumber;
function parseSearchResults(root, config) {
    const base = (0, matcher_1.getFirstMatching)(root, config.htmlSearchRuleSet.resultListRule);
    if (!base) {
        throw new Error('Could not find result list in html');
    }
    const searchResult = (0, matcher_1.getAllMatching)(base, config.htmlSearchRuleSet.resultRule);
    const links = searchResult
        .map((el) => (0, matcher_1.getFirstMatching)(el, config.htmlSearchRuleSet.resultLinkRule))
        .filter((el) => { var _a; return el.data && ((_a = el.data) === null || _a === void 0 ? void 0 : _a.length) > 0; })
        .map((el) => {
        const url = makeLinkAbsolute(el.data[0].href, config.documentUrlConfig);
        return {
            text: el.data[0].text,
            href: url,
            hash: (0, url_1.hashUrlVariables)(url, config.documentUrlConfig),
        };
    });
    return links;
}
exports.parseSearchResults = parseSearchResults;
function makeLinkAbsolute(link, config) {
    const path = link[0] == '.' ? link.substring(1) : link;
    return config.base + path;
}
//# sourceMappingURL=searcher.js.map
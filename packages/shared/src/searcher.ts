import {
	SourceSiteConfig,
	UrlConfig,
	HtmlSearchRuleSet,
} from './schemas/rules';
import { ParsedNode } from './schemas/document_version';
import { SearchResult } from './schemas/search';
import { getFirstMatching, getAllMatching } from './matcher';
import { scrape } from './scraper';
import { buildUrl, hashUrlVariables } from './url';

export async function search(
	searchInput: Record<string, string>,
	config: SourceSiteConfig,
): Promise<SearchResult[]> {
	const url = buildUrl(searchInput, config.searchUrlConfig);
	console.log(`URL :${url}`);
	const scrapeResult = await scrape(url);
	return parseSearchResults(scrapeResult, config);
}

export function incrementPageNumber(
	searchInput: Record<string, string>,
	config: HtmlSearchRuleSet,
): Record<string, string> {
	const pageVariableName = config.pageVariable;
	let lastPageValue = searchInput[pageVariableName];
	let pageNumber: number;
	if (!lastPageValue) {
		pageNumber = 2;
	} else {
		let lastPageNumber = parseInt(lastPageValue);
		if (Number.isNaN(lastPageNumber)) {
			throw Error(
				`cannot parse ${searchInput[pageVariableName]} to a number`,
			);
		}
		pageNumber = lastPageNumber + 1;
	}
	searchInput[pageVariableName] = pageNumber.toString();
	return searchInput;
}

export function parseSearchResults(
	root: ParsedNode,
	config: SourceSiteConfig,
): SearchResult[] {
	const base = getFirstMatching(
		root,
		config.htmlSearchRuleSet.resultListRule,
	);
	if (!base) {
		throw new Error('Could not find result list in html');
	}
	const searchResult = getAllMatching(
		base,
		config.htmlSearchRuleSet.resultRule,
	);
	const links = searchResult
		.map((el) =>
			getFirstMatching(
				el,
				config.htmlSearchRuleSet.resultLinkRule,
			),
		)
		.filter((el) => el.data && el.data?.length > 0)
		.map((el) => {
			const url = makeLinkAbsolute(
				el.data[0].href,
				config.documentUrlConfig,
			);
			return {
				text: el.data[0].text,
				href: url,
				hash: hashUrlVariables(
					url,
					config.documentUrlConfig,
				),
			};
		});
	return links;
}

function makeLinkAbsolute(link: string, config: UrlConfig) {
	const path = link[0] == '.' ? link.substring(1) : link;
	return config.base + path;
}

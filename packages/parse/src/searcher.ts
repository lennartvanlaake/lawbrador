import {
	SourceSiteConfig,
	HtmlSearchRuleSet,
} from 'packages/shared/schemas/rules';
import { ParsedNode } from 'packages/shared/schemas/document_version';
import { SearchResult } from 'packages/shared/schemas/search';
import { getFirstMatching, getAllMatching } from './matcher';
import { scrape } from './scraper';

function applyVariables(url: string, variables: any): string {
	for (const prop in variables) {
		url = url.replace(prop, variables[prop]);
	}
	return url;
}

function getUrl(config: SourceSiteConfig, variables: any): string {
	const renderedPath = applyVariables(
		config.htmlSearchRuleSet.pathWithVariables,
		variables,
	);
	return config.baseUrl + renderedPath;
}

export async function search(
	config: SourceSiteConfig,
	searchInput: any,
): Promise<SearchResult[]> {
	const url = getUrl(config, searchInput);
	const scrapeResult = await scrape(url);
	return parseSearchResults(scrapeResult, config.htmlSearchRuleSet);
}

export function parseSearchResults(
	root: ParsedNode,
	searchRuleSet: HtmlSearchRuleSet,
): SearchResult[] {
	const base = getFirstMatching(root, searchRuleSet.resultListRule);
	const searchResult = getAllMatching(base, searchRuleSet.resultRule);
	const links = searchResult
		.map((el) => getFirstMatching(el, searchRuleSet.resultLinkRule))
		.filter((el) => el.data && el.data?.length > 0)
		.map((el) => {
			return {
				text: el.data[0].text,
				href: el.data[0].href,
			};
		});
	return links;
}

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
	return parseSearchResults(scrapeResult, config);
}

export function parseSearchResults(
	root: ParsedNode,
	config: SourceSiteConfig,
): SearchResult[] {
	const base = getFirstMatching(
		root,
		config.htmlSearchRuleSet.resultListRule,
	);
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
			return {
				text: el.data[0].text,
				href: makeLinkAbsolute(el.data[0].href, config),
			};
		});
	return links;
}

function makeLinkAbsolute(link: string, config: SourceSiteConfig) {
	const path = link[0] == '.' ? link.substring(1) : link;
	return config.baseUrl + path;
}

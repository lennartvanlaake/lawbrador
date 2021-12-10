import { SourceSiteConfig, UrlConfig } from 'packages/shared/schemas/rules';
import { ParsedNode } from 'packages/shared/schemas/document_version';
import { SearchResult } from 'packages/shared/schemas/search';
import { getFirstMatching, getAllMatching } from './matcher';
import { scrape } from './scraper';
import { hashUrlVariables, buildUrl } from '@legalthingy/shared/utils';

export async function search(
	searchInput: Record<string, string>,
	config: SourceSiteConfig,
): Promise<SearchResult[]> {
	const url = buildUrl(searchInput, config.searchUrlConfig);
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

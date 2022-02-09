import {
	SourceSiteConfig,
	UrlConfig,
	HtmlSearchRuleSet,
	SelectionRule,
} from './schemas/rules';
import { ParsedNode } from './schemas/scrape';
import { SearchResult } from './schemas/search';
import { getFirstMatching, getAllMatching } from './matcher';
import { hashUrlVariables } from './url';

const LINK_RULE: SelectionRule = { op: "is", location: "tag", value: "a" };

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
	
	const links = base.children 
		.map(it =>
			getFirstMatching(
				it,
				LINK_RULE,
				config.htmlSearchRuleSet.resultLinkRule
			),
		)
		.map(it => {
			const url = makeLinkAbsolute(
				it.href,
				config.documentUrlConfig,
			);
			return {
				text: getFullText(it),
				href: url,
				hash: hashUrlVariables(url, config.documentUrlConfig)
			};
		});
	return links ?? [];
}

function getFullText(node: ParsedNode) {
	const childText = node.children?.reduce((p, c) => p += getFullText(c), "");
   	return node.text ?? "" + childText
}

function makeLinkAbsolute(link: string, config: UrlConfig) {
	const path = link[0] == '.' ? link.substring(1) : link;
	return config.base + path;
}

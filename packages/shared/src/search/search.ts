import {hashUrlVariables, getFirstMatching, ParsedNode, SearchResult, SelectionRule, SourceSiteConfig, UrlConfig} from "..";

const LINK_RULE: SelectionRule = { op: "is", location: "tag", value: "a" };

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
	const childText = node.children?.reduce((p: string, c: ParsedNode) => p += getFullText(c), "");
   	return node.text ?? "" + childText
}

function makeLinkAbsolute(link: string, config: UrlConfig) {
	const path = link[0] == '.' ? link.substring(1) : link;
	return config.base + path;
}

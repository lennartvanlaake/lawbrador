import type {
  ParsedNode,
  SearchResult,
  SelectionRule,
  SourceSiteConfig,
} from "..";
import {
  hashUrlVariables,
  getFirstMatching,
  getAllMatching,
  makeLinkAbsolute,
} from "..";

const LINK_RULE: SelectionRule = { op: "is", location: "tag", value: "a" };

export function parseSearchResults(
  root: ParsedNode,
  config: SourceSiteConfig
): SearchResult[] {
  const base = getFirstMatching(root, config.htmlSearchRuleSet.resultListRule);
  if (!base) {
    throw new Error("Could not find result list in html");
  }

  const links = getAllMatching(
    base,
    LINK_RULE,
    config.htmlSearchRuleSet.resultLinkRule
  ).map((it) => {
    if (!it?.href) {
      throw Error(`Cannot convert element without href to link`);
    }
    const url = makeLinkAbsolute(it.href, config.documentUrlConfig.base);
    return {
      text: getFullText(it),
      href: url,
      hash: hashUrlVariables(url, config.documentUrlConfig),
    };
  });
  return links ?? [];
}

function getFullText(node: ParsedNode) {
  const childText = node.children?.reduce(
    (p: string, c: ParsedNode) => (p += getFullText(c)),
    ""
  );
  return node.text ?? "" + childText;
}

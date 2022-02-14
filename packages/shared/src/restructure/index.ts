import {RestructuredDocument, ScrapeResult, SourceSiteConfig} from "..";

export function restructure(
  scrapeResult: ScrapeResult,
  config: SourceSiteConfig 
): RestructuredDocument {
  const ruleSet = selectRuleSet(scrapeResult.body, config);
  const body = applyRuleSet(scrapeResult.body, ruleSet);
  return {
    url: scrapeResult.url,
    hash: scrapeResult.hash,
    body: body,
  };
}

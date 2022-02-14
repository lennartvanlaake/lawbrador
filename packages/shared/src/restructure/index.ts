import { RestructuredDocument, ScrapeResult, SourceSiteConfig } from "..";
import { applyRuleSet } from "./applyRuleSet";
import { selectRuleSet } from "./selectRuleSet";

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

import type { RestructuredDocument, ScrapeResult, SourceSiteConfig } from "..";
import { applyRuleSet } from "./applyRuleSet";
import { selectRuleSet } from "./selectRuleSet";

export function restructure(
  scrapeResult: ScrapeResult,
  config: SourceSiteConfig,
  sourceUrl: string
): RestructuredDocument {
  const ruleSet = selectRuleSet(scrapeResult.body, config);
  const body = applyRuleSet(scrapeResult.body, ruleSet, config, sourceUrl);
  return {
    url: scrapeResult.url,
    hash: scrapeResult.hash,
    body: body,
  };
}

export { applyRuleSet } from "./applyRuleSet";

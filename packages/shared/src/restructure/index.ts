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
    reference: {
      name: null,
      url: scrapeResult.url,
      hash: scrapeResult.hash,
      sourceConfigId: config._id
    },
    body: body,
  };
}

export { applyRuleSet } from "./applyRuleSet";

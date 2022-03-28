import type { Static } from "@sinclair/typebox";
import type {
  documentRuleSet,
  htmlSearchRuleSet,
  markupRule,
  pageAndQuery,
  queryParam,
  searchUrlConfig,
  selectionRule,
  sourceSiteConfig,
  staticUrlComponent,
  urlComponent,
  urlConfig,
  valueWithDisplayName,
  variableUrlComponent,
} from "./rules";
import type {
  ALL_SELECTION_OPERATORS,
  ALL_SELECTION_LOCATIONS,
} from "./ruleConstants";

export type SelectionOperator = typeof ALL_SELECTION_OPERATORS[number];
export type SelectionLocation = typeof ALL_SELECTION_LOCATIONS[number];
export interface SelectionRule extends Static<typeof selectionRule> {
  nestedRule?: SelectionRule;
}
export type MarkupRule = Static<typeof markupRule>;
export type DocumentRuleSet = Static<typeof documentRuleSet>;
export type HtmlSearchRuleSet = Static<typeof htmlSearchRuleSet>;
export type ValueWithDisplayName = Static<typeof valueWithDisplayName>;
export type StaticUrlComponent = Static<typeof staticUrlComponent>;
export type VariableUrlComponent = Static<typeof variableUrlComponent>;
export type UrlComponent = Static<typeof urlComponent>;
export type QueryParam = Static<typeof queryParam>;
export type UrlConfig = Static<typeof urlConfig>;
export type PageAndQuery = Static<typeof pageAndQuery>;
export type SearchUrlConfig = PageAndQuery & UrlConfig;
export type SourceSiteConfig = Static<typeof sourceSiteConfig>;

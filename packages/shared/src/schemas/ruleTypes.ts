import { Static } from "@sinclair/typebox";
import {
  documentRuleSet,
  htmlSearchRuleSet,
  markupRule,
  queryParam,
  selectionRule,
  sourceSiteConfig,
  staticUrlComponent,
  urlComponent,
  urlConfig,
  valueWithDisplayName,
  variableUrlComponent,
} from "./rules";
import {
  ALL_SELECTION_OPERATORS,
  ALL_SELECTION_LOCATIONS,
} from "./ruleConstants";

export type SelectionOperator = typeof ALL_SELECTION_OPERATORS[number];
export type SelectionLocation = typeof ALL_SELECTION_LOCATIONS[number];
export type SelectionRule = Static<typeof selectionRule>;
export type MarkupRule = Static<typeof markupRule>;
export type DocumentRuleSet = Static<typeof documentRuleSet>;
export type HtmlSearchRuleSet = Static<typeof htmlSearchRuleSet>;
export type ValueWithDisplayName = Static<typeof valueWithDisplayName>;
export type StaticUrlComponent = Static<typeof staticUrlComponent>;
export type VariableUrlComponent = Static<typeof variableUrlComponent>;
export type UrlComponent = Static<typeof urlComponent>;
export type QueryParam = Static<typeof queryParam>;
export type UrlConfig = Static<typeof urlConfig>;
export type SourceSiteConfig = Static<typeof sourceSiteConfig>;

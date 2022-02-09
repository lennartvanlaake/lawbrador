import { Static, Type } from "@sinclair/typebox";
import {markupNotation} from "./tags";

export const ALL_SELECTION_OPERATORS = ["is", "includes", "regex"] as const;

export const selectionOperator = Type.Union(
  ALL_SELECTION_OPERATORS.map((op) => Type.Literal(op)),
);

export type SelectionOperator = typeof ALL_SELECTION_OPERATORS[number];

export const ALL_SELECTION_LOCATIONS = ["tag", "class", "id", "link", "text"] as const;

export const selectionLocation = Type.Union(
  ALL_SELECTION_LOCATIONS.map((loc) => Type.Literal(loc)),
);

export type SelectionLocation = typeof ALL_SELECTION_LOCATIONS[number];

export const selectionRule = Type.Object({
  op: selectionOperator,
  location: selectionLocation,
  value: Type.String({ minLength: 1 }),
});
export type SelectionRule = Static<typeof selectionRule>;

export const markupRule = Type.Object({
	tag: markupNotation,
	filter: selectionRule
})

export type MarkupRule = Static<typeof markupRule>;

export const documentRuleSet = Type.Object({
  name: Type.Optional(Type.String()),
  conditionRules: Type.Optional(Type.Array(selectionRule)),
  markupRules: Type.Optional(Type.Array(markupRule)),
  bodyRule: Type.Optional(selectionRule),
});

export type DocumentRuleSet = Static<typeof documentRuleSet>;

export const htmlSearchRuleSet = Type.Object({
  pageVariable: Type.String({ minLength: 1 }),
  queryVariable: Type.String({ minLength: 1 }),
  resultListRule: selectionRule,
  resultLinkRule: Type.Optional(selectionRule),
});

export type HtmlSearchRuleSet = Static<typeof htmlSearchRuleSet>;

export const valueWithDisplayName = Type.Object({
  value: Type.String({ minLength: 1 }),
  displayName: Type.Optional(Type.String()),
});

export type ValueWithDisplayName = Static<typeof valueWithDisplayName>;

export const staticUrlComponent = Type.Object({ value: Type.String({ minLength: 1 }) });

export type StaticUrlComponent = Static<typeof staticUrlComponent>;

export const variableUrlComponent = Type.Object({
  variableName: Type.String({ minLength: 1 }),
  possibleValues: Type.Optional(Type.Array(valueWithDisplayName, { minItems: 1, uniqueItems: true })),
});

export type VariableUrlComponent = Static<typeof variableUrlComponent>;

export const urlComponent = Type.Union([
  staticUrlComponent,
  variableUrlComponent,
]);

export type UrlComponent = Static<typeof urlComponent>;

export const queryParam = Type.Object({
  name: Type.String({ minLength: 1 }),
  urlComponent: urlComponent,
});

export type QueryParam = Static<typeof queryParam>;

export const urlConfig = Type.Object({
  base: Type.String({ format: "uri" }),
  pathComponents: Type.Array(urlComponent),
  queryComponents: Type.Array(queryParam),
});

export type UrlConfig = Static<typeof urlConfig>;

export const sourceSiteConfig = Type.Object({
  _id: Type.String(),
  name: Type.String({ minLength: 1 }),
  searchUrlConfig: urlConfig,
  documentUrlConfig: urlConfig,
  documentRuleSets: Type.Array(documentRuleSet),
  htmlSearchRuleSet: htmlSearchRuleSet,
});

export const sourceSiteConfigs = Type.Array(sourceSiteConfig);

export type SourceSiteConfig = Static<typeof sourceSiteConfig>;

export const unsavedSourceSiteConfig = Type.Omit(sourceSiteConfig, ['_id'])

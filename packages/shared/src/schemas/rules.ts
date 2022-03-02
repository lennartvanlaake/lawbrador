import { Type } from "@sinclair/typebox";
import { markupNotation } from "./tags";
import {
  ALL_SELECTION_LOCATIONS,
  ALL_SELECTION_OPERATORS,
} from "./ruleConstants";

export const selectionOperator = Type.Union(
  ALL_SELECTION_OPERATORS.map((op) => Type.Literal(op))
);

export const selectionLocation = Type.Union(
  ALL_SELECTION_LOCATIONS.map((loc) => Type.Literal(loc))
);

export const selectionRule = Type.Object({
  op: selectionOperator,
  location: selectionLocation,
  value: Type.String({ minLength: 1 }),
  nestedRule: Type.Optional(Type.Any()),
});

export const markupRule = Type.Object({
  tag: markupNotation,
  filter: selectionRule,
});

export const documentRuleSet = Type.Object({
  name: Type.Optional(Type.String()),
  conditionRules: Type.Optional(Type.Array(selectionRule)),
  markupRules: Type.Optional(Type.Array(markupRule)),
  bodyRule: Type.Optional(selectionRule),
});

export const htmlSearchRuleSet = Type.Object({
  pageVariable: Type.String({ minLength: 1 }),
  queryVariable: Type.String({ minLength: 1 }),
  resultListRule: selectionRule,
  resultLinkRule: Type.Optional(selectionRule),
});

export const valueWithDisplayName = Type.Object({
  value: Type.String({ minLength: 1 }),
  displayName: Type.Optional(Type.String()),
});

export const staticUrlComponent = Type.Object({
  value: Type.String({ minLength: 1 }),
});

export const variableUrlComponent = Type.Object({
  variableName: Type.String({ minLength: 1 }),
  possibleValues: Type.Optional(
    Type.Array(valueWithDisplayName, { minItems: 1, uniqueItems: true })
  ),
});

export const urlComponent = Type.Union([
  staticUrlComponent,
  variableUrlComponent,
]);

export const queryParam = Type.Object({
  name: Type.String({ minLength: 1 }),
  urlComponent: urlComponent,
});

export const urlConfig = Type.Object({
  base: Type.String({ format: "uri" }),
  pathComponents: Type.Array(urlComponent),
  queryComponents: Type.Array(queryParam),
});

export const sourceSiteConfig = Type.Object({
  _id: Type.String(),
  name: Type.String({ minLength: 1 }),
  searchUrlConfig: urlConfig,
  documentUrlConfig: urlConfig,
  documentRuleSets: Type.Array(documentRuleSet),
  htmlSearchRuleSet: htmlSearchRuleSet,
});

export const sourceSiteConfigs = Type.Array(sourceSiteConfig);

export const unsavedSourceSiteConfig = Type.Omit(sourceSiteConfig, ["_id"]);

import { Type } from "@sinclair/typebox";
import { markupNotation } from "./tags";
import {
  ALL_SELECTION_LOCATIONS,
  ALL_SELECTION_OPERATORS,
} from "./ruleConstants";
import { keyValue, NullOptional } from "./generic";

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
  nestedRule: NullOptional(Type.Any()),
});

export const markupRule = Type.Object({
  tag: markupNotation,
  filter: selectionRule,
});

export const documentRuleSet = Type.Object({
  name: NullOptional(Type.String()),
  conditionRules: NullOptional(Type.Array(selectionRule)),
  preserveMarkup: NullOptional(Type.Boolean({ default: true })),
  markupRules: NullOptional(Type.Array(markupRule)),
  bodyRule: NullOptional(selectionRule),
});

export const htmlSearchRuleSet = Type.Object({
  resultListRule: selectionRule,
  resultLinkRule: NullOptional(selectionRule),
});

export const valueWithDisplayName = Type.Object({
  value: Type.String({ minLength: 1 }),
  displayName: NullOptional(Type.String()),
});

export const staticUrlComponent = Type.Object({
  value: Type.String({ minLength: 1 }),
});

export const variableUrlComponent = Type.Object({
  variableName: Type.String({ minLength: 1 }),
  showIf: NullOptional(keyValue),
  possibleValues: NullOptional(
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

export const pageAndQuery = Type.Object({
  pageVariable: NullOptional(Type.String({ minLength: 1 })),
  queryVariable: Type.String({ minLength: 1 }),
});

export const searchUrlConfig = Type.Intersect([urlConfig, pageAndQuery]);

export const sourceSiteConfig = Type.Object({
  _id: Type.String(),
  name: Type.String({ minLength: 1 }),
  description: NullOptional(Type.String()),
  searchUrlConfig: searchUrlConfig,
  documentUrlConfig: urlConfig,
  documentRuleSets: Type.Array(documentRuleSet),
  htmlSearchRuleSet: htmlSearchRuleSet,
});

export const sourceSiteConfigs = Type.Array(sourceSiteConfig);

export const unsavedSourceSiteConfig = Type.Omit(sourceSiteConfig, ["_id"]);

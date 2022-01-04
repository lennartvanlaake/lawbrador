import { Static, Type } from '@sinclair/typebox';

export const ALL_SELECTION_OPERATORS = ['is', 'includes'] as const;

export const selectionOperator = Type.Union(
	ALL_SELECTION_OPERATORS.map((op) => Type.Literal(op)),
	{
		$id: 'selectionOperator',
	},
);

export type SelectionOperator = typeof ALL_SELECTION_OPERATORS[number];

export const ALL_SELECTION_LOCATIONS = ['tag', 'class', 'id'] as const;

export const selectionLocation = Type.Union(
	ALL_SELECTION_LOCATIONS.map((loc) => Type.Literal(loc)),
	{ $id: 'selectionLocation' },
);

export type SelectionLocation = typeof ALL_SELECTION_LOCATIONS[number];

export const selectionRule = Type.Object(
	{
		op: selectionOperator,
		location: selectionLocation,
		value: Type.String(),
	}
);
selectionRule.properties.value.minLength = 1;
export type SelectionRule = Static<typeof selectionRule>;

export const documentRuleSet = Type.Object({
	conditionRules: Type.Array(Type.Ref(selectionRule)),
	bodyRule: Type.Optional(Type.Ref(selectionRule)),
});

export type DocumentRuleSet = Static<typeof documentRuleSet>;

export const htmlSearchRuleSet = Type.Object({
	pageVariable: Type.String(),
	queryVariable: Type.String(),
	resultListRule: Type.Ref(selectionRule),
	resultLinkRule: Type.Ref(selectionRule),
	resultRule: Type.Ref(selectionRule),
	resultDescriptionRule: Type.Optional(Type.Ref(selectionRule)),
});

export type HtmlSearchRuleSet = Static<typeof htmlSearchRuleSet>;

export const valueWithDisplayName = Type.Object({
	value: Type.String(),
	displayName: Type.Optional(Type.String()),
});

export type ValueWithDisplayName = Static<typeof valueWithDisplayName>;

export const staticUrlComponent = Type.Object(
	{ value: Type.String() },
	{ $id: 'staticUrlComponent' },
);

export type StaticUrlComponent = Static<typeof staticUrlComponent>;

export const variableUrlComponent = Type.Object(
	{
		variableName: Type.String(),
		possibleValues: Type.Optional(
			Type.Array(Type.Ref(valueWithDisplayName)),
		),
	},
	{ $id: 'variableUrlComponent' },
);

export type VariableUrlComponent = Static<typeof variableUrlComponent>;

export const urlComponent = Type.Union(
	[Type.Ref(staticUrlComponent), Type.Ref(variableUrlComponent)],
	{ $id: 'urlComponent' },
);

export type UrlComponent = Static<typeof urlComponent>;

export const urlConfig = Type.Object({
	base: Type.String({ format: 'uri' }),
	pathComponents: Type.Array(Type.Ref(urlComponent)),
	queryComponents: Type.Record(Type.String(), Type.Ref(urlComponent)),
});

export type UrlConfig = Static<typeof urlConfig>;

export const sourceSiteConfig = Type.Object({
	_id: Type.Optional(Type.String()),
	name: Type.String(),
	searchUrlConfig: Type.Ref(urlConfig),
	documentUrlConfig: Type.Ref(urlConfig),
	documentRuleSets: Type.Array(Type.Ref(documentRuleSet)),
	htmlSearchRuleSet: Type.Ref(htmlSearchRuleSet),
});

export type SourceSiteConfig = Static<typeof sourceSiteConfig>;

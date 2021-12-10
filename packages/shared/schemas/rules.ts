import { Static, Type } from '@sinclair/typebox';

export enum SelectionOperator {
	Is,
	Includes,
}

export const selectionOperator = Type.Enum(SelectionOperator, {
	$id: 'selectionOperator',
});

export enum SelectionLocation {
	Tag,
	Class,
	Id,
}

export const selectionLocation = Type.Enum(SelectionLocation, {
	$id: 'selectionLocation',
});

export const selectionRule = Type.Object(
	{
		op: Type.Ref(selectionOperator),
		location: Type.Ref(selectionLocation),
		value: Type.String(),
	},
	{ $id: 'selectionRule' },
);

export type SelectionRule = Static<typeof selectionRule>;

export const documentRuleSet = Type.Object({
	id: Type.String(),
	conditionRules: Type.Array(Type.Ref(selectionRule)),
	bodyRule: Type.Optional(Type.Ref(selectionRule)),
});

export type DocumentRuleSet = Static<typeof documentRuleSet>;

export const htmlSearchRuleSet = Type.Object({
	resultListRule: Type.Ref(selectionRule),
	resultLinkRule: Type.Ref(selectionRule),
	resultRule: Type.Ref(selectionRule),
	resultDescriptionRule: Type.Optional(Type.Ref(selectionRule)),
});

export type HtmlSearchRuleSet = Static<typeof htmlSearchRuleSet>;

export const urlComponent = Type.Object(
	{
		value: Type.String(),
		static: Type.Boolean(),
	},
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
	id: Type.String(),
	name: Type.String(),
	searchUrlConfig: Type.Ref(urlConfig),
	documentUrlConfig: Type.Ref(urlConfig),
	documentRuleSets: Type.Array(Type.Ref(documentRuleSet)),
	htmlSearchRuleSet: Type.Ref(htmlSearchRuleSet),
});

export type SourceSiteConfig = Static<typeof sourceSiteConfig>;

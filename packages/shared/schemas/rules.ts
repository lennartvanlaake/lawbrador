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

export const urlSelectionRule = Type.Object(
	{
		op: Type.Ref(selectionOperator),
		value: Type.String(),
	},
	{ $id: 'urlSelectionRule' },
);

export type SelectionRule = Static<typeof selectionRule>;
export type UrlSelectionRule = Static<typeof urlSelectionRule>;

export const ruleSet = Type.Object({
	urlRules: Type.Ref(urlSelectionRule),
	bodyRule: Type.Optional(selectionRule),
});
export type RuleSet = Static<typeof ruleSet>;

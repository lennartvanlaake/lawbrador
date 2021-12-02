import { documentRuleSet } from './rules';
import { Static, Type } from '@sinclair/typebox';

export const nodeLink = Type.Object({
	href: Type.Optional(Type.String()),
	text: Type.Optional(Type.String()),
});

export const nodeProperties = Type.Object({
	name: Type.Optional(Type.String()),
	id: Type.Optional(Type.String()),
	class: Type.Optional(Type.String()),
});

export const parsedNode = Type.Rec(
	(Self) =>
		Type.Object({
			meta: Type.Any(),
			chain: Type.Array(Type.Ref(nodeProperties)),
			data: Type.Array(Type.Ref(nodeLink)),
			children: Type.Optional(Type.Array(Self)),
		}),
	{ $id: 'parsedNode' },
);

export interface ParsedNode extends Static<typeof parsedNode> {
	children?: ParsedNode[];
}

export const documentVersion = Type.Object(
	{
		_id: Type.String(),
		url: Type.String(),
		created: Type.Number(),
		appliedRules: Type.Optional(Type.Ref(documentRuleSet)),
		bodyNode: Type.Ref(parsedNode),
		textRootNode: Type.Ref(parsedNode),
	},
	{ $id: 'documentVersion' },
);

export type DocumentVersion = Static<typeof documentVersion>;
export type DocumentVersion = Static<typeof documentVersion>;

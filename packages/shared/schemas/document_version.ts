import { ruleSet } from './rules';
import { Static, Type } from '@sinclair/typebox';

export const parsedNode = Type.Rec(
	(Self) =>
		Type.Object({
			name: Type.String(),
			meta: Type.Any(),
			id: Type.Optional(Type.String()),
			class: Type.Optional(Type.String()),
			text: Type.Optional(Type.String()),
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
		appliedRules: Type.Optional(Type.Ref(ruleSet)),
		bodyNode: Type.Ref(parsedNode),
		textRootNode: Type.Ref(parsedNode),
	},
	{ $id: 'documentVersion' },
);

export type DocumentVersion = Static<typeof documentVersion>;

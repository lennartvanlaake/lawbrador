import { Static, Type } from '@sinclair/typebox';

export const parsedNodeData = Type.Object({
	href: Type.Optional(Type.String()),
	text: Type.Optional(Type.String()),
});

export type ParsedNodeData = Static<typeof parsedNodeData>;

export const parsedNodeProperties = Type.Object({
	name: Type.Optional(Type.String()),
	id: Type.Optional(Type.String()),
	class: Type.Optional(Type.String()),
});

export const parsedNode = Type.Rec(
	(Self) =>
		Type.Object({
			meta: Type.Any(),
			chain: Type.Array(Type.Ref(parsedNodeProperties)),
			data: Type.Array(Type.Ref(parsedNodeData)),
			children: Type.Optional(Type.Array(Self)),
		}),
	{ $id: 'parsedNode' },
);

export interface ParsedNode extends Static<typeof parsedNode> {
	children?: ParsedNode[];
}

export const scrapeResult = Type.Object({
	url: Type.String(),
	hash: Type.String(),
	body: parsedNode,
});

export type ScrapeResult = Static<typeof scrapeResult>;

export const scrapeRequest = Type.Object({
	url: Type.String(),
	sourceConfigId: Type.String(),
});

export type ScrapeRequest = Static<typeof scrapeRequest>;

// output after all mutations have been applied
export const restructuredNode = Type.Rec(
	(Self) =>
		Type.Object({
			name: Type.Optional(Type.String()),
			href: Type.Optional(Type.String()),
			text: Type.Optional(Type.String()),
			children: Type.Optional(Type.Array(Self)),
		}),
	{ $id: 'restructuredNode' },
);

export type RestructuredNode = Static<typeof restructuredNode>;

export const restructuredDocument = Type.Object({
	hash: Type.String(),
	url: Type.String(),
	body: restructuredNode,
});

export type RestructuredDocument = Static<typeof restructuredDocument>;

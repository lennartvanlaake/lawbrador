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

export const scrapeEvent = Type.Object(
	{
		id: Type.String(),
		url: Type.String(),
		hash: Type.String(),
		type: Type.Literal('scrape'),
		timestamp: Type.Number(),
		bodyNode: Type.Ref(parsedNode),
		sourceConfigId: Type.String(),
	},
	{ $id: 'scrapeEvent' },
);

export type ScrapeEvent = Static<typeof scrapeEvent>;

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
	id: Type.String(),
	hash: Type.String(),
	scrapeId: Type.String(),
	url: Type.String(),
	timestamp: Type.Number(),
	nodes: Type.Array(Type.Ref(restructuredNode)),
});

export type RestructuredDocument = Static<typeof restructuredDocument>;

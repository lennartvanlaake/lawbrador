import { Static, Type } from '@sinclair/typebox';

export const documentSummary = Type.Object(
	{
		id: Type.String(),
	},
	{ $id: 'searchDocumentSummary' },
);

export type DocumentSummary = Static<typeof documentSummary>;

export const searchResult = Type.Object({
	text: Type.String(),
	href: Type.String(),
	hash: Type.String(),
	document: Type.Optional(Type.Ref(documentSummary)),
});

export type SearchResult = Static<typeof searchResult>;

export const searchRequest = Type.Object({
	sourceConfigId: Type.String(),
	searchParams: Type.Intersect([
		Type.Record(Type.String(), Type.String()),
		Type.Object({
			query: Type.Optional(Type.String()),
			page: Type.Optional(Type.String()),
		}),
	]),
});

export type SearchRequest = Static<typeof searchRequest>;

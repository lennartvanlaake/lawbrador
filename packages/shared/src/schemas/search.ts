import { Static, Type } from '@sinclair/typebox';

export const searchResult = Type.Object({
	text: Type.String(),
	href: Type.String(),
});

export type SearchResult = Static<typeof searchResult>;

export const searchResponse = Type.Object({
	results: Type.Array(searchResult),
})

export type SearchResponse = Static<typeof searchResponse>;

export const searchRequest = Type.Object({
	sourceConfigId: Type.String(),
	searchParams: Type.Record(Type.String(), Type.String()),
});

export type SearchRequest = Static<typeof searchRequest>;

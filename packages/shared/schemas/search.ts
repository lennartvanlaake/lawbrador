import { Static, Type } from '@sinclair/typebox';

export const searchResult = Type.Object({
	text: Type.String(),
	href: Type.String(),
});

export type SearchResult = Static<typeof searchResult>;

export const searchRequest = Type.Object({
	sourceConfigId: Type.String(),
	searchParams: Type.Any(),
});

export type SearchRequest = Static<typeof searchRequest>;

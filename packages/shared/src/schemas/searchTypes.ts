import type { searchRequest, searchResponse, searchResult } from "./search";
import type { Static } from "@sinclair/typebox";
export type SearchResult = Static<typeof searchResult>;
export type SearchResponse = Static<typeof searchResponse>;
export type SearchRequest = Static<typeof searchRequest>;

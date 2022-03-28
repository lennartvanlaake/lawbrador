import type { searchRequest, searchResponse, searchResult } from "./search";
import type { Static } from "@sinclair/typebox";

interface PageAndQueryVariables {
  query?: string;
  page?: string;
}
export type SearchResult = Static<typeof searchResult>;
export type SearchResponse = Static<typeof searchResponse>;
export type SearchRequest = Static<typeof searchRequest>;
export type SearchParams = Record<string, string> & PageAndQueryVariables;

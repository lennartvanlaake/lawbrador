import {searchRequest, searchResponse, searchResult} from './search';
import { Static } from '@sinclair/typebox';
export type SearchResult = Static<typeof searchResult>;
export type SearchResponse = Static<typeof searchResponse>;
export type SearchRequest = Static<typeof searchRequest>;

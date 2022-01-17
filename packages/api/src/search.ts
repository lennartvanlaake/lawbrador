import type { FastifyInstance } from "fastify";
import {
  SearchRequest,
  searchRequest,
  searchResponse,
} from "@lawbrador/shared/src/schemas/search";
import { createHash, routeConfig } from "./utils";
import { buildUrl } from "@lawbrador/shared/src/url";
import { scrape } from "@lawbrador/shared/src/scraper";
import { parseSearchResults } from "@lawbrador/shared/src/searcher";
import { SEARCH_ENDPOINT } from "@lawbrador/shared/src/endpoints";

export default async (fastify: FastifyInstance) => {
  fastify.post<{ Body: SearchRequest }>(
    SEARCH_ENDPOINT,
    routeConfig(searchResponse, searchRequest),
    async (req) => {
      const config = await fastify.collections.sourceConfigs.get(
        req.body.sourceConfigId
      );
      const queryParamsHash = createHash(req.body.searchParams, config);
      const searchUrl = buildUrl(req.body.searchParams, config.searchUrlConfig);
      const rawSearchResult =
        await fastify.collections.searchCache.cachedOrCreated(
          {
            hash: queryParamsHash,
          },
          async () => await scrape(searchUrl, queryParamsHash)
        );
      return parseSearchResults(rawSearchResult.body, config);
    }
  );
};

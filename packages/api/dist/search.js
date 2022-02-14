import { createHash, routeConfig } from "./utils";
import { buildUrl, Endpoints, Schemas, parseSearchResults, scrape, } from "@lawbrador/shared";
export default async (fastify) => {
    fastify.post(Endpoints.SEARCH, routeConfig(Schemas.searchResponse, Schemas.searchRequest), async (req) => {
        const config = await fastify.collections.sourceConfigs.get(req.body.sourceConfigId);
        const queryParamsHash = createHash(req.body.searchParams, config);
        const searchUrl = buildUrl(req.body.searchParams, config.searchUrlConfig);
        const rawSearchResult = await fastify.collections.searchCache.cachedOrCreated({
            hash: queryParamsHash,
        }, async () => await scrape(searchUrl, queryParamsHash));
        return { results: parseSearchResults(rawSearchResult.body, config) };
    });
};
//# sourceMappingURL=search.js.map
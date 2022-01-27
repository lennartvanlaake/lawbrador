import { searchRequest, searchResponse, } from "@lawbrador/shared/src/schemas/search";
import { createHash, routeConfig } from "./utils";
import { buildUrl } from "@lawbrador/shared/src/url";
import { scrape } from "@lawbrador/shared/src/scraper";
import { parseSearchResults } from "@lawbrador/shared/src/searcher";
import { SEARCH_ENDPOINT } from "@lawbrador/shared/src/endpoints";
export default async (fastify) => {
    fastify.post(SEARCH_ENDPOINT, routeConfig(searchResponse, searchRequest), async (req) => {
        const config = await fastify.collections.sourceConfigs.get(req.body.sourceConfigId);
        const queryParamsHash = createHash(req.body.searchParams, config);
        const searchUrl = buildUrl(req.body.searchParams, config.searchUrlConfig);
        console.log(`url: ${searchUrl}`);
        const rawSearchResult = await fastify.collections.searchCache.cachedOrCreated({
            hash: queryParamsHash,
        }, async () => await scrape(searchUrl, queryParamsHash));
        console.log(JSON.stringify(rawSearchResult));
        return { results: parseSearchResults(rawSearchResult.body, config) };
    });
};
//# sourceMappingURL=search.js.map
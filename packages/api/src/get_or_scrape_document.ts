import { applyConfig } from "@lawbrador/shared/src/rule_applyer";
import {
  RestructuredDocument,
  ScrapeRequest,
} from "@lawbrador/shared/src/schemas/scrape";
import { GET_OR_SCRAPE_DOCUMENT } from "@lawbrador/shared/src/endpoints";
import { FastifyInstance } from "fastify";
import { scrape } from "@lawbrador/shared/src/scraper";
import { extractUrlVariables, hashObject } from "packages/shared/src/url";

export default async (fastify: FastifyInstance) => {
  fastify.get<{ Params: ScrapeRequest }>(
    GET_OR_SCRAPE_DOCUMENT,
    async (req): Promise<RestructuredDocument> => {
      const url = req.params.url;
      const config = await fastify.collections.sourceConfigs.get(
        req.params.sourceConfigId
      );
      const hash = hashObject(
        extractUrlVariables(url, config.documentUrlConfig)
      );
      const documentScrape =
        await fastify.collections.documentScrapeCache.cachedOrCreated(
          { hash: hash },
          async () => await scrape(url, hash)
        );
      return applyConfig(documentScrape, config);
    }
  );
};

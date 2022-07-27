import type { FastifyInstance } from "fastify";
import type { GetMultipleRequest, RestructuredDocument, ScrapeRequest } from "@lawbrador/shared";
import {
  extractUrlVariables,
  Endpoints,
  Schemas,
  restructure,
  scrape,
} from "@lawbrador/shared";
import { createHash } from "./utils";
import { ObjectId } from "mongodb";

export default async (fastify: FastifyInstance) => {
  fastify.route<{ Body: GetMultipleRequest }>({
    method: "POST",
    url: `${Endpoints.GET_OR_SCRAPE_DOCUMENT}/search`,
    handler: async(req): Promise<RestructuredDocument[]> => {
      const foundDocuments = await fastify.collections.documentScrapeCache.find({
        hash: { $in: req.body.references.map(it => it.hash) }
      }) 
      const foundDocumentsMap = foundDocuments.reduce((acc, doc) => {
        acc[doc.hash] = doc;
        return acc;
      }, {});
      const allSourceConfigs = await fastify.collections.sourceConfigs.find({});
      const uniqueSourceConfigIds = [... new Set(req.body.references.map(it => new ObjectId(it.sourceConfigId)))]
      const sourceConfigs = await fastify.collections.sourceConfigs.find({
        _id: { $in: uniqueSourceConfigIds } 
      })
      const sourceConfigMap = sourceConfigs.reduce((acc, conf) => {
        acc[conf._id] = conf
        return acc
      }, {});
      return req.body.references.map(it => restructure(foundDocumentsMap[it.hash], sourceConfigMap[it.sourceConfigId], it.url))
   }
  });



  fastify.get<{ Querystring: ScrapeRequest }>(
    Endpoints.GET_OR_SCRAPE_DOCUMENT,
    {
      schema: {
        querystring: Schemas.scrapeRequest,
      },
    },
    async (req): Promise<RestructuredDocument> => {
      const url = req.query.url;
      const config = await fastify.collections.sourceConfigs.getOrThrow(
        req.query.sourceConfigId
      );
      const hash = createHash(
        extractUrlVariables(url, config.documentUrlConfig),
        config
      );
      try {
        const documentScrape =
          await fastify.collections.documentScrapeCache.cachedOrCreated(
            { hash: hash },
            async () => await scrape(url, hash)
          );
        return restructure(documentScrape, config, url);
      } catch (e) {
        throw { statusCode: 500, message: e.message };
      }
    }
  );
};

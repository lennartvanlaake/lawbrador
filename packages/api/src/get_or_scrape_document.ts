import type { FastifyInstance } from 'fastify';
import type { RestructuredDocument, ScrapeRequest, ErrorResponse } from '@lawbrador/shared';
import { extractUrlVariables, Endpoints, Schemas, restructure, scrape } from '@lawbrador/shared';
import { createHash } from './utils';

export default async (fastify: FastifyInstance) => {
	fastify.get<{ Querystring: ScrapeRequest }>(
		Endpoints.GET_OR_SCRAPE_DOCUMENT,
		{
			schema: {
				querystring: Schemas.scrapeRequest,
				response: {
					200: Schemas.restructuredDocument
				}
			}
		},
		async (req): Promise<RestructuredDocument> => {
			const url = req.query.url;
			const config = await fastify.collections.sourceConfigs.getOrThrow(req.query.sourceConfigId);
			const hash = createHash(extractUrlVariables(url, config.documentUrlConfig), config);
			try {
				const documentScrape = await fastify.collections.documentScrapeCache.cachedOrCreated(
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

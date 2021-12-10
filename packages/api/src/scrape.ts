import type { FastifyPluginAsync } from 'fastify';
import * as scraper from '@legalthingy/parse/src/scraper';
import { applyConfig } from '@legalthingy/parse/src/rule_applyer';
import { getCollection } from './utils';
import { getSourceConfigById } from './source_configs';
import {
	ScrapeEvent,
	ScrapeRequest,
	RestructuredDocument,
} from '@legalthingy/shared/schemas/document_version';
import { Identity } from '@legalthingy/shared/schemas/generic';
import { hashObject, extractUrlVariables } from '@legalthingy/shared/utils';
import { v4 } from 'uuid';

export const scrapeRoutes: FastifyPluginAsync = async (fastify) => {
	const scrapeEventCollection = getCollection(fastify, 'scrape_event');
	const documentCollection = getCollection(fastify, 'documents');
	fastify.post<{ Body: ScrapeRequest }>(
		'/api/scrape',
		async (req): Promise<Identity> => {
			const url = req.body.url;
			const config = getSourceConfigById(
				req.body.sourceConfigId,
			);
			const urlVariables = extractUrlVariables(
				url,
				config.documentUrlConfig,
			);
			const documentHash = hashObject(urlVariables);
			const existingDocument =
				await documentCollection.findOne({
					hash: documentHash,
				});
			if (existingDocument) {
				return existingDocument.id;
			} else {
				const result = await scraper.scrape(url);
				const newScrape: ScrapeEvent = {
					id: v4(),
					sourceConfigId: '1',
					hash: documentHash,
					type: 'scrape',
					timestamp: new Date().getTime(),
					bodyNode: result,
					url: url,
				};
				scrapeEventCollection.insertOne(newScrape);
				const document: RestructuredDocument = {
					id: v4(),
					scrapeId: newScrape.id,
					hash: documentHash,
					url: url,
					timestamp: new Date().getTime(),
					nodes: applyConfig(
						newScrape.bodyNode,
						config,
					),
				};
				await documentCollection.insertOne(document);
				return { id: document.id };
			}
		},
	);
	fastify.get<{ Params: Identity }>('/api/scrape/:id', async (req) => {
		return await documentCollection.findOne({
			id: req.params.id,
		});
	});
};

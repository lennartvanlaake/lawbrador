import type { FastifyPluginAsync } from 'fastify';
import * as scraper from '@legalthingy/parse/src/scraper';
import { applyConfig } from '@legalthingy/parse/src/rule_applyer';
import { getCollection } from './utils';
import { getSourceConfigById } from './source_configs';
import {
	ScrapeEvent,
	ScrapeRequest,
	RestructuredDocument,
	RestructuredNode,
} from '@legalthingy/shared/schemas/document_version';
import { Identity } from '@legalthingy/shared/schemas/generic';
import { v4 } from 'uuid';

export const scrapeRoutes: FastifyPluginAsync = async (fastify) => {
	const scrapeEventCollection = getCollection(fastify, 'scrape_event');
	const documentCollection = getCollection(fastify, 'scrape_event');
	fastify.post<{ Body: ScrapeRequest }>(
		'/api/scrape',
		async (req): Promise<Identity> => {
			const url = req.body.url;
			const config = getSourceConfigById(
				req.body.sourceConfigId,
			);
			const existingScrape =
				await scrapeEventCollection.findOne({
					url: url,
				});
			let restructuredNodes: RestructuredNode[];
			if (existingScrape) {
				restructuredNodes = applyConfig(
					existingScrape.bodyNode,
					config,
				);
			} else {
				const result = await scraper.scrape(url);
				const newScrape: ScrapeEvent = {
					id: v4(),
					sourceConfigId: '1',
					type: 'scrape',
					timestamp: new Date().getTime(),
					bodyNode: result,
					url: url,
				};
				scrapeEventCollection.insertOne(newScrape);
				restructuredNodes = applyConfig(
					newScrape.bodyNode,
					config,
				);
			}
			const document: RestructuredDocument = {
				id: v4(),
				name: req.body.url,
				timestamp: new Date().getTime(),
				nodes: restructuredNodes,
			};
			await documentCollection.insertOne(document);
			return { id: document.id };
		},
	);
	fastify.get<{ Params: Identity }>('/api/scrape/:id', async (req) => {
		return await documentCollection.findOne({
			id: req.params.id,
		});
	});
};

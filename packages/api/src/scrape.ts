import type { FastifyPluginAsync } from 'fastify';
import * as scraper from '@legalthingy/parse/src/scraper';
import { getCollection } from './utils';
import { DocumentVersion } from '@legalthingy/shared/schemas/document_version';
import { IdParams } from '@legalthingy/shared/schemas/generic';
import { ObjectId } from 'mongodb';

export const scrapeRoutes: FastifyPluginAsync = async (fastify) => {
	const scrapeCollection = getCollection(fastify, 'scrape');
	fastify.post<{ Body: any }>('/api/scrape', async (req) => {
		const url = req.body.url;
		const existingScrape = await scrapeCollection.findOne({
			url: url,
		});
		if (existingScrape) {
			return existingScrape;
		} else {
			const result = await scraper.scrape(url);
			const newScrape: Omit<DocumentVersion, '_id'> = {
				created: new Date().getTime(),
				bodyNode: result,
				textRootNode: result,
				url: url,
			};
			scrapeCollection.insertOne(newScrape);
			return newScrape;
		}
	});
	fastify.get('/api/scrape', async () => {
		return await scrapeCollection.find().toArray();
	});
	fastify.get<{ Params: IdParams }>('/api/scrape/:id', async (req) => {
		return await scrapeCollection.findOne({
			_id: new ObjectId(req.params.id),
		});
	});
};

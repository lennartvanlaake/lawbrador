import type { FastifyPluginAsync } from 'fastify';
import * as scraper from '@legalthingy/parse/src/scraper';
import { getCollection } from './utils';

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
			const newScrape = {
				nodes: await scraper.scrape(url),
				created: new Date(),
				url: url,
			};
			scrapeCollection.insertOne(newScrape);
			return newScrape;
		}
	});
};

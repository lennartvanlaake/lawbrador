import type { FastifyPluginAsync } from 'fastify';
import { process } from '@legalthingy/parse/src/processor';

export const scrapeRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.post('/api/scrape', async (req) => {
		return process((req.body as any).url);
	});
};

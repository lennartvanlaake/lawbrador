import type { FastifyPluginAsync } from 'fastify';
import { process } from '@legalthingy/parse/src/processor';

export const scrapeRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.post('/api/scrape', async (req) => {
		const result = await process((req.body as any).url);
		console.log(result);
		return result;
	});
};

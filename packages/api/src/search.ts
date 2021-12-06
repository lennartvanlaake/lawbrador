import type { FastifyPluginAsync } from 'fastify';
import { search } from '@legalthingy/parse/src/searcher';
import { SearchRequest } from '@legalthingy/shared/schemas/search';
import { getSourceConfigById } from './source_configs';

export const searchRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.post<{ Body: SearchRequest }>('/api/search', (req) => {
		const config = getSourceConfigById(req.body.sourceConfigId);
		return search(config, req.body.searchParams);
	});
};

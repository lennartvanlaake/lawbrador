import { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
import type { FastifyPluginAsync } from 'fastify';

export const sourceConfigRoutes: FastifyPluginAsync = async (
	fastify,
	_options,
) => {	
	fastify.get('/api/sources', {}, async () => {
		return await fastify.collections.sourceConfigs.all();
	});
	fastify.post<{ Body: Omit<SourceSiteConfig, '_id'> }>('/api/sources', {}, async (req) => {
		//await sourceConfigCollection.insertOne(req.body);
		//const inserted = req.body as SourceSiteConfig;
		//return inserted._id;
	});
};

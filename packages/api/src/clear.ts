import type { FastifyPluginAsync } from 'fastify';
import { clean } from '@lawbrador/shared/src/db/utils';

export const clearRoutes: FastifyPluginAsync = async (fastify, _options) => {
	fastify.delete('/api/all', {}, async () => {
		await clean(fastify.client);
		return { status: 'success' };
	});
};

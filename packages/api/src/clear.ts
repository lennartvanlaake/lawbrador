import type { FastifyPluginAsync } from 'fastify';

export const clearRoutes: FastifyPluginAsync = async (fastify, _options) => {
	fastify.delete('/api/all', {}, async (_request, _reply) => {
		const collections = await fastify.db.collections();
		collections.forEach(async (c) => {
			await c.deleteMany({});
		});
		return { status: 'success' };
	});
};

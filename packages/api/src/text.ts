import type { FastifyPluginAsync } from 'fastify';
import * as schema from '@legalthingy/shared/schemas/text';
import { getCollection } from './utils'; 
import { FastifyRequest } from 'fastify';

export const textRoutes: FastifyPluginAsync = async (fastify, _options) => {
	const textCollection = getCollection(fastify, 'text');

	fastify.post<{ Body: schema.BodyType; Reply: schema.ResponseType }>(
		'/api/text',
		{
			schema: {
				body: schema.bodySchema,
				response: {
					200: schema.responseSchema,
				},
			},
		},
		async (request, _reply) => {
			await textCollection.insertOne(request.body);
			return { status: 'success!' };
		},
	);

	fastify.get('/api/text', {}, async (_request, _reply) => {
		return await textCollection.find().toArray();
	});

	fastify.get(
		'/api/text/:id',
		{},
		async (request: FastifyRequest, _reply) => {
			return await textCollection.findOne({
				_id: request.id,
			});
		},
	);
};

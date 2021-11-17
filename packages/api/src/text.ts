import type { FastifyPluginAsync } from 'fastify';
import * as schema from '@legalthingy/shared/schemas/text';
import { Text } from './mongo';

export const textRoutes: FastifyPluginAsync = async (fastify, _options) => {
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
			await new Text(request.body).save();
			return { status: 'success!' };
		},
	);

	fastify.get('/api/text', {}, async (_request, _reply) => {
		return await Text.find();
	});
};

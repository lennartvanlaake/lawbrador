import type { FastifyPluginAsync } from 'fastify';
import * as schema from '@legalthingy/shared/schemas/text';
import { producer } from './kafka';
import { TEXT_TOPIC } from '@legalthingy/shared/kafka';
import { Text } from '@legalthingy/shared/mongo';

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
			await producer.send({
				topic: TEXT_TOPIC,
				messages: [{ value: request.body.text }],
			});
			return { status: 'success!' };
		},
	);

	fastify.get('/api/text', {}, async (_request, _reply) => {
		return await Text.find();
	});
};

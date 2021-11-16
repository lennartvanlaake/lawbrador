import type { FastifyPluginAsync } from 'fastify';
import * as schema from '@legalthingy/shared/schemas/text';
import { producer } from './kafka';
import { MESSAGE_TOPIC } from '@legalthingy/shared';

export const textRoutes: FastifyPluginAsync = async (fastify, _options) => {
	fastify.post<{ Body: schema.BodyType; Reply: schema.ResponseType }>(
		'/text',
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
				topic: MESSAGE_TOPIC,
				messages: [{ value: request.body.text }],
			});
			return { status: 'success!' };
		},
	);
};

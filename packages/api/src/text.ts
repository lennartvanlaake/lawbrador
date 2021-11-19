import type { FastifyPluginAsync } from 'fastify';
import * as schema from '@legalthingy/shared/schemas/text';
import { getCollection } from './utils';
import { FastifyRequest } from 'fastify';

export const textRoutes: FastifyPluginAsync = async (fastify, _options) => {
	const textCollection = getCollection(fastify, 'text');

	fastify.post<{
		Body: schema.DocumentUpload;
		Reply: schema.StatusResponse;
	}>(
		'/api/text',
		{
			schema: {
				body: schema.documentUpload,
				response: {
					200: schema.statusResponse,
				},
			},
		},
		async (request, _reply) => {
			await textCollection.insertOne(request.body);
			return { status: schema.ResponseStatus.success };
		},
	);

	fastify.get(
		'/api/text',
		{
			schema: {
				response: {
					200: schema.documents,
				},
			},
		},
		async (_request, _reply) => {
			return await textCollection.find().toArray();
		},
	);

	fastify.get(
		'/api/text/:id',
		{
			schema: {
				response: {
					200: schema.document,
				},
			},
		},
		async (request: FastifyRequest, _reply) => {
			return await textCollection.findOne({
				_id: request.id,
			});
		},
	);
};

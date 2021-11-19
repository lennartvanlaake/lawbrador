import type { FastifyPluginAsync } from 'fastify';
import { documentUpload, DocumentUpload, document, documents } from '@legalthingy/shared/schemas/text';
import { IdParams, StatusResponse, statusResponse, ResponseStatus } from '@legalthingy/shared/schemas/generic';
import { getCollection } from './utils';
import { ObjectId } from 'mongodb';

export const textRoutes: FastifyPluginAsync = async (fastify, _options) => {
	const textCollection = getCollection(fastify, 'text');

	fastify.post<{
		Body: DocumentUpload;
		Reply: StatusResponse;
	}>(
		'/api/text',
		{
			schema: {
				body: documentUpload,
				response: {
					200: statusResponse,
				},
			},
		},
		async (request, _reply) => {
			await textCollection.insertOne(request.body);
			return { status: ResponseStatus.success };
		},
	);

	fastify.get(
		'/api/text',
		{
			schema: {
				response: {
					200: documents,
				},
			},
		},
		async (_request, _reply) => {
			return await textCollection.find().toArray();
		},
	);

	fastify.get<{ Params: IdParams }>(
		'/api/text/:id',
		{
		 	schema: {
				response: {
					200: document,
				},
			},
		},
		async (request, _reply) => {
			const text = await textCollection.findOne({
				_id: new ObjectId(request.params.id),
			});
			return text;
		},
	);
};

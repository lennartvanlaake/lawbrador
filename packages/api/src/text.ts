import type { FastifyPluginAsync } from 'fastify';
//import {
//documentUpload,
//DocumentUpload,
//document,
//documents,
//} from '@legalthingy/shared/schemas/document';
import {
	IdParams,
	StatusResponse,
	statusResponse,
	ResponseStatus,
} from '@legalthingy/shared/schemas/generic';
import { getCollection } from './utils';
import { ObjectId } from 'mongodb';

export const documentRoutes: FastifyPluginAsync = async (fastify, _options) => {
	const documentCollection = getCollection(fastify, 'document');

	fastify.post(
		//<{
		//Body: DocumentUpload;
		//Reply: StatusResponse;
		//}>(
		'/api/document',
		//{
		//schema: {
		//body: documentUpload,
		//response: {
		//200: statusResponse,
		//},
		//},
		//},
		async (request, _reply) => {
			const newDocument: any = request.body;
			newDocument.created = new Date();
			await documentCollection.insertOne(newDocument);
			return { status: ResponseStatus.success };
		},
	);

	fastify.get(
		'/api/document',
		//{
		//schema: {
		//response: {
		//200: documents,
		//},
		//},
		//},
		async (_request, _reply) => {
			return await documentCollection.find().toArray();
		},
	);

	fastify.get<{ Params: IdParams }>(
		'/api/document/:id',
		//{
		//schema: {
		//response: {
		//200: document,
		//},
		//},
		//},
		async (request, _reply) => {
			const document = await documentCollection.findOne({
				_id: new ObjectId(request.params.id),
			});
			return document;
		},
	);
};

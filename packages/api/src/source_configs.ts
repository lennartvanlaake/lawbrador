import { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import {getCollection} from './utils';
import { ObjectId } from 'mongodb';

export const getSourceConfigById = async(id: string, fastify: FastifyInstance): Promise<SourceSiteConfig> => {
	const sourceConfigCollection = getCollection(fastify, 'sourceConfigs');
	return await sourceConfigCollection.findOne({ _id: new ObjectId(id) }) as SourceSiteConfig
}

export const sourceConfigRoutes: FastifyPluginAsync = async (
	fastify,
	_options,
) => {
	const sourceConfigCollection = getCollection(fastify, 'sourceConfigs');
	fastify.get('/api/sources', {}, async () => {
		return await sourceConfigCollection.find({}).toArray();
	});
	fastify.post<{ Body: Omit<SourceSiteConfig, '_id'> }>('/api/sources', {}, async (req) => {
		await sourceConfigCollection.insertOne(req.body);
		const inserted = req.body as SourceSiteConfig;
		return inserted._id;
	});
};

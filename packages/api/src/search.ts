import type { FastifyPluginAsync } from 'fastify';
import { search } from '@legalthingy/parse/src/searcher';
import { hashObject } from '@legalthingy/parse/src/url';
import { SearchRequest } from '@legalthingy/shared/schemas/search';
import { getSourceConfigById } from './source_configs';
import { getCollection } from './utils';

export const searchRoutes: FastifyPluginAsync = async (fastify) => {
	const documentCollection = getCollection(fastify, 'documents');
	const searchColleciton = getCollection(fastify, 'search');
	fastify.post<{ Body: SearchRequest }>('/api/search', async (req) => {
		const config = getSourceConfigById(req.body.sourceConfigId);
		const queryParamsHash = hashObject({
			params: req.body.searchParams,
			config: config,
		});
		const cachedResults = await searchColleciton.findOne({
			hash: queryParamsHash,
		});
		let results;
		if (cachedResults) {
			results = cachedResults.list;
		} else {
			results = await search(req.body.searchParams, config);
			searchColleciton.insertOne({
				hash: queryParamsHash,
				list: results,
			});
		}
		const resultHashes = results.map((r) => r.hash);
		const documents = await documentCollection
			.find({
				hash: { $in: resultHashes },
			})
			.toArray();
		const documentMap = documents.reduce((result, doc) => {
			result[doc.hash] = { id: doc.id };
			return result;
		}, {});
		return results.map((res) => {
			res.document = documentMap[res.hash];
			return res;
		});
	});
};

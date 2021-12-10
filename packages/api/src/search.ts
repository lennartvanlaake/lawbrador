import type { FastifyPluginAsync } from 'fastify';
import { search } from '@legalthingy/parse/src/searcher';
import { SearchRequest } from '@legalthingy/shared/schemas/search';
import { getSourceConfigById } from './source_configs';
import { getCollection } from './utils';
export const searchRoutes: FastifyPluginAsync = async (fastify) => {
	const documentCollection = getCollection(fastify, 'documents');
	fastify.post<{ Body: SearchRequest }>('/api/search', async (req) => {
		const config = getSourceConfigById(req.body.sourceConfigId);
		const results = await search(req.body.searchParams, config);
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

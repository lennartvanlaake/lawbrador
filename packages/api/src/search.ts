import type { FastifyPluginAsync } from 'fastify';
import { search } from '@legalthingy/parse/src/searcher';
import { SearchRequest } from '@legalthingy/shared/schemas/search';
import { getSourceConfigById } from './source_configs';
import { getCollection } from './utils';

export const searchRoutes: FastifyPluginAsync = async (fastify) => {
	const documentCollection = getCollection(fastify, 'documents');
	fastify.post<{ Body: SearchRequest }>('/api/search', async (req) => {
		const config = getSourceConfigById(req.body.sourceConfigId);
		const results = await search(config, req.body.searchParams);
		const resultLinks = results.map((r) => r.href);
		console.log('1');
		const documents = await documentCollection
			.find({
				url: { $in: resultLinks },
			})
			.toArray();
		const documentMap = documents.reduce(
			(result, doc) => (result[doc.href] = { id: doc.id }),
			{},
		);
		return results.map((res) => {
			res.document = documentMap[res.href];
			return res;
		});
	});
};

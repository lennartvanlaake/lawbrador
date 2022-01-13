import type { FastifyPluginAsync } from 'fastify';
import { clean } from '@lawbrador/shared/src/db/utils';
import {ALL_ENDPOINT} from '@lawbrador/shared/src/endpoints';

export const clearRoutes: FastifyPluginAsync = async (fastify, _options) => {
	fastify.delete(ALL_ENDPOINT, {}, async () => {
		await clean(fastify.client);
		return { status: 'success' };
	});
};

import type { FastifyInstance } from 'fastify';
import { clean } from '@lawbrador/shared/src/db/utils';
import {ALL_ENDPOINT} from '@lawbrador/shared/src/endpoints';

export default async (fastify: FastifyInstance) => {
	fastify.delete(ALL_ENDPOINT, {}, async () => {
		await clean(fastify.client);
		return { status: 'success' };
	});
};

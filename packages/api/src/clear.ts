import type { FastifyInstance } from 'fastify';
import {Endpoints, clean} from '@lawbrador/shared';

export default async (fastify: FastifyInstance) => {
	fastify.delete(Endpoints.ALL, {}, async () => {
		await clean(fastify.client);
		return { status: 'success' };
	});
};


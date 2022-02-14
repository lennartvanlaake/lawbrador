import type { FastifyInstance } from 'fastify';
import {Endpoints} from '@lawbrador/shared';
import { clean } from '@lawbrador/db';

export default async (fastify: FastifyInstance) => {
	fastify.delete(Endpoints.ALL, {}, async () => {
		await clean(fastify.client);
		return { status: 'success' };
	});
};


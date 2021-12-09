import type { FastifyInstance } from 'fastify';
import type { UriConfig } from '@legalthingy/shared/schemas/rules';

export function getCollection(fastify: FastifyInstance, name: string) {
	return fastify.db.collection(name);
}


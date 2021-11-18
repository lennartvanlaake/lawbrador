import type { FastifyInstance } from 'fastify';

export function getCollection(fastify: FastifyInstance, name: string) {
	return fastify.db.collection(name);
}

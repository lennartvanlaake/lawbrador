import Fastify from 'fastify';
import { textRoutes } from './text';
import { clearRoutes } from './clear';
import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

const fastify = Fastify({ logger: true });
fastify.register(textRoutes);
fastify.register(clearRoutes);
const url = 'mongodb://admin:admin@localhost:27017';

declare module 'fastify' {
	interface FastifyInstance {
		db: Db;
	}
}

const start = async () => {
	try {
		const client = await MongoClient.connect(url);
		fastify.decorate('db', client.db('db'));
		await fastify.listen(5000);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();

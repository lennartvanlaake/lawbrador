import Fastify from 'fastify';
import { clearRoutes } from './clear';
import { sourceConfigRoutes } from './source_configs';
//import { scrapeRoutes } from './scrape';
//import { searchRoutes } from './search';
import { LAWBRADOR_CLIENT } from '@lawbrador/shared/src/db/constants'
import { ALL_COLLECTIONS } from '@lawbrador/shared/src/db/collections';
import { MongoClient } from 'mongodb';
import {TypedCollection} from 'packages/shared/src/db/Collection';

const fastify = Fastify({ logger: true });
fastify.register(clearRoutes);
//fastify.register(scrapeRoutes);
//fastify.register(searchRoutes);
fastify.register(sourceConfigRoutes);

declare module 'fastify' {
	interface FastifyInstance {
		client: MongoClient;
		collections: typeof ALL_COLLECTIONS;
	}
}

const start = async () => {
	try {
		await LAWBRADOR_CLIENT.connect();
		fastify.decorate('client', LAWBRADOR_CLIENT);
		fastify.decorate('collections', ALL_COLLECTIONS);
		Object.values(fastify.collections).forEach((c: TypedCollection<any>) => c.connect(LAWBRADOR_CLIENT));
		await fastify.listen(5000);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();

import Fastify from 'fastify';
import { clearRoutes } from './clear';
import { sourceConfigRoutes } from './source_configs';
//import { scrapeRoutes } from './scrape';
//import { searchRoutes } from './search';
import fastifySwagger from 'fastify-swagger';
import { LAWBRADOR_CLIENT } from '@lawbrador/shared/src/db/constants'
import { ALL_COLLECTIONS } from '@lawbrador/shared/src/db/collections';
import { MongoClient } from 'mongodb';
import ProcessorRegistry from '@lawbrador/events/src/processorRegistry'
import { LAWBRADOR_REGISTRY } from '@lawbrador/events';

const fastify = Fastify({ logger: true });
fastify.register(fastifySwagger, { routePrefix: "/api/swagger", exposeRoute: true });
fastify.register(clearRoutes);
//fastify.register(scrapeRoutes);
//fastify.register(searchRoutes);
fastify.register(sourceConfigRoutes);

declare module 'fastify' {
	interface FastifyInstance {
		client: MongoClient;
		events: ProcessorRegistry;
		collections: typeof ALL_COLLECTIONS;
	}
}

const start = async () => {
	try {
		await LAWBRADOR_CLIENT.connect();
		fastify.decorate('client', LAWBRADOR_CLIENT);
		fastify.decorate('collections', ALL_COLLECTIONS);
		fastify.decorate('events', LAWBRADOR_REGISTRY); 
		LAWBRADOR_REGISTRY.connect(LAWBRADOR_CLIENT);	
		await fastify.listen(5000);
  		fastify.swagger()
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();



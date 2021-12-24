import Fastify from 'fastify';
import { clearRoutes } from './clear';
import { sourceConfigRoutes } from './source_configs';
import { scrapeRoutes } from './scrape';
import { searchRoutes } from './search';
import { MongoClient } from 'mongodb';
const fastify = Fastify({ logger: true });
fastify.register(clearRoutes);
fastify.register(scrapeRoutes);
fastify.register(sourceConfigRoutes);
fastify.register(searchRoutes);
const url = 'mongodb://localhost:27017?replicaSet=rs0&readPreference=primary&ssl=false';
const start = async () => {
    try {
        const client = await MongoClient.connect(url);
        fastify.decorate('db', client.db('db'));
        await fastify.listen(5000);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map
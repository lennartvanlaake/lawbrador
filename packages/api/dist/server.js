import Fastify from 'fastify';
import { clearRoutes } from './clear';
import { sourceConfigRoutes } from './source_configs';
//import { scrapeRoutes } from './scrape';
//import { searchRoutes } from './search';
import { LAWBRADOR_CLIENT } from '@lawbrador/shared/src/db/constants';
const fastify = Fastify({ logger: true });
fastify.register(clearRoutes);
//fastify.register(scrapeRoutes);
//fastify.register(searchRoutes);
fastify.register(sourceConfigRoutes);
const start = async () => {
    try {
        await LAWBRADOR_CLIENT.connect();
        fastify.decorate('client', LAWBRADOR_CLIENT);
        await fastify.listen(5000);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map
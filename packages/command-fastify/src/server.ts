import Fastify from 'fastify';
import { textRoutes } from './text';

const fastify = Fastify({ logger: true });
fastify.register(textRoutes);

const start = async () => {
	try {
		await fastify.listen(5000);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();

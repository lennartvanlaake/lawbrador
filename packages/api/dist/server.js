import Fastify from "fastify";
import clearRoutes from "./clear";
import sourceConfigRoutes from "./source_configs";
import getOrScrapeDocumentRoutes from "./get_or_scrape_document";
import searchRoutes from "./search";
import fastifySwagger from "fastify-swagger";
import { LAWBRADOR_CLIENT } from "@lawbrador/shared/src/db/constants";
import { ALL_COLLECTIONS } from "@lawbrador/shared/src/db/collections";
import { LAWBRADOR_REGISTRY } from "@lawbrador/events";
const fastify = Fastify({
    logger: {
        prettyPrint: {
            colorize: true,
            ignore: "pid,hostname",
        },
    },
});
fastify.register(fastifySwagger, {
    routePrefix: "/api/swagger",
    exposeRoute: true,
});
fastify.register(clearRoutes);
fastify.register(getOrScrapeDocumentRoutes);
fastify.register(searchRoutes);
fastify.register(sourceConfigRoutes);
const start = async () => {
    try {
        await LAWBRADOR_CLIENT.connect();
        fastify.decorate("client", LAWBRADOR_CLIENT);
        fastify.decorate("collections", ALL_COLLECTIONS);
        fastify.decorate("events", LAWBRADOR_REGISTRY);
        LAWBRADOR_REGISTRY.connect(LAWBRADOR_CLIENT);
        await fastify.listen(5000);
        fastify.swagger();
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map
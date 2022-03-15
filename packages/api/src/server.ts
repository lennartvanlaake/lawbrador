import Fastify from "fastify";
import clearRoutes from "./clear";
import sourceConfigRoutes from "./source_configs";
import getOrScrapeDocumentRoutes from "./get_or_scrape_document";
import searchRoutes from "./search";
import authRoutes from "./auth";
import fastifySwagger from "fastify-swagger";
import type { MongoClient } from "mongodb";
import { ALL_COLLECTIONS, LAWBRADOR_CLIENT } from "@lawbrador/db";
import type { ProcessorRegistry } from "@lawbrador/events";
import { LAWBRADOR_REGISTRY } from "@lawbrador/events";
import fastifyJwt from "fastify-jwt";

declare module "fastify" {
  interface FastifyInstance {
    client: MongoClient;
    events: ProcessorRegistry;
    collections: typeof ALL_COLLECTIONS;
  }
}

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
fastify.register(authRoutes);
fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET ?? "secret" });

const start = async () => {
  try {
    await LAWBRADOR_CLIENT.connect();
    fastify.decorate("client", LAWBRADOR_CLIENT);
    fastify.decorate("collections", ALL_COLLECTIONS);
    fastify.decorate("events", LAWBRADOR_REGISTRY);
    LAWBRADOR_REGISTRY.connect(LAWBRADOR_CLIENT);
    await fastify.listen(5000, "0.0.0.0");
    fastify.swagger();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

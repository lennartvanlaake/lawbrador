import type { FastifyInstance } from "fastify";
import {
  Endpoints,
  Schemas,
  SourceSiteConfig,
  toIdentity,
} from "@lawbrador/shared";
import { id } from "@lawbrador/db";
import { routeConfig } from "./utils";
import { EventFactory } from "@lawbrador/events";
import {auth} from "./auth";

export default async (fastify: FastifyInstance) => {
  fastify.get(
    Endpoints.SOURCES,
    routeConfig(Schemas.sourceSiteConfigs),
    async () => {
      const sourceConfigs = await fastify.collections.sourceConfigs.all();
      return sourceConfigs;
    }
  );
  fastify.route<{ Body: Omit<SourceSiteConfig, "_id"> }>({
    method: "POST",
    url: Endpoints.SOURCES,
    schema: {
      response: Schemas.identity,
      body: Schemas.unsavedSourceSiteConfig,
    },
    preHandler: auth(fastify),
    handler: async (req) => {
      const newConfig: SourceSiteConfig = { ...req.body, _id: id() };
      await fastify.events.processSync(
        EventFactory.SourceConfigCreated({ sourceConfig: newConfig })
      );
      return toIdentity(newConfig._id);
    },
  });
  fastify.route<{ Body: SourceSiteConfig }>({
    method: "PUT",
    url: Endpoints.SOURCES,
    schema: {
      response: Schemas.identity,
      body: Schemas.sourceSiteConfig,
    },
    preHandler: auth(fastify),
    handler: async (req) => {
      await fastify.events.processSync(
        EventFactory.SourceConfigUpdated({ sourceConfig: req.body })
      );
      return toIdentity(req.body._id);
    },
  });
};

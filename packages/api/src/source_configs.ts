import type { FastifyInstance } from "fastify";
import {
  Endpoints,
  Schemas,
  SourceSiteConfig,
  toIdentity,
} from "@lawbrador/shared";
import { id } from '@lawbrador/db';
import { routeConfig } from "./utils";
import { EventFactory } from "@lawbrador/events";

export default async (fastify: FastifyInstance) => {
  fastify.get(
    Endpoints.SOURCES,
    routeConfig(Schemas.sourceSiteConfigs),
    async () => {
      const sourceConfigs = await fastify.collections.sourceConfigs.all();
      return sourceConfigs;
    }
  );
  fastify.post<{ Body: Omit<SourceSiteConfig, "_id"> }>(
    Endpoints.SOURCES,
    routeConfig(Schemas.identity, Schemas.unsavedSourceSiteConfig),
    async (req) => {
      const newConfig: SourceSiteConfig = { ...req.body, _id: id() };
      await fastify.events.processSync(
        EventFactory.SourceConfigCreated({ sourceConfig: newConfig })
      );
      return toIdentity(newConfig._id);
    }
  );
  fastify.put<{ Body: SourceSiteConfig }>(
    Endpoints.SOURCES,
    routeConfig(Schemas.identity, Schemas.sourceSiteConfig),
    async (req) => {
	debugger;
      await fastify.events.processSync(
        EventFactory.SourceConfigUpdated({ sourceConfig: req.body })
      );
      return toIdentity(req.body._id);
    }
  );
};

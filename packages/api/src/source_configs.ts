import * as RuleSchema from "@lawbrador/shared/src/schemas/rules";
import * as GenericSchema from "@lawbrador/shared/src/schemas/generic";
import { SourceSiteConfig } from "@lawbrador/shared/src/schemas/rules";
import EventFactory from "@lawbrador/events/src/eventFactory";
import type { FastifyPluginAsync } from "fastify";
import { id } from "@lawbrador/shared/src/db/utils";
import { toIdentity } from "@lawbrador/shared/src/utils";
import { SOURCES_ENDPOINT } from "@lawbrador/shared/src/endpoints";
import { routeConfig } from "./utils";
export const sourceConfigRoutes: FastifyPluginAsync = async (
  fastify,
  _options
) => {
  fastify.get(
    SOURCES_ENDPOINT,
    routeConfig(RuleSchema.sourceSiteConfigs),
    async () => {
      return await fastify.collections.sourceConfigs.all();
    }
  );
  fastify.post<{ Body: Omit<SourceSiteConfig, "_id"> }>(
    SOURCES_ENDPOINT,
    routeConfig(GenericSchema.identity, RuleSchema.unsavedSourceSiteConfig),
    async (req) => {
      const newConfig: SourceSiteConfig = { ...req.body, _id: id() };
      await fastify.events.processSync(
        EventFactory.SourceConfigCreated({ sourceConfig: newConfig })
      );
      return toIdentity(newConfig._id);
    }
  );
  fastify.put<{ Body: SourceSiteConfig }>(
    SOURCES_ENDPOINT,
    routeConfig(GenericSchema.identity, RuleSchema.sourceSiteConfig),
    async (req) => {
      await fastify.events.processSync(
        EventFactory.SourceConfigUpdated({ sourceConfig: req.body })
      );
      return toIdentity(req.body._id);
    }
  );
};

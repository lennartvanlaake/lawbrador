import { id, Endpoints, Schemas, toIdentity, } from "@lawbrador/shared";
import { routeConfig } from "./utils";
import { EventFactory } from "@lawbrador/events";
export default async (fastify) => {
    fastify.get(Endpoints.SOURCES, routeConfig(Schemas.sourceSiteConfigs), async () => {
        return await fastify.collections.sourceConfigs.all();
    });
    fastify.post(Endpoints.SOURCES, routeConfig(Schemas.identity, Schemas.unsavedSourceSiteConfig), async (req) => {
        const newConfig = Object.assign(Object.assign({}, req.body), { _id: id() });
        await fastify.events.processSync(EventFactory.SourceConfigCreated({ sourceConfig: newConfig }));
        return toIdentity(newConfig._id);
    });
    fastify.put(Endpoints.SOURCES, routeConfig(Schemas.identity, Schemas.sourceSiteConfig), async (req) => {
        await fastify.events.processSync(EventFactory.SourceConfigUpdated({ sourceConfig: req.body }));
        return toIdentity(req.body._id);
    });
};
//# sourceMappingURL=source_configs.js.map
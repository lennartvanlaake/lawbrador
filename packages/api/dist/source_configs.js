import * as RuleSchema from "@lawbrador/shared/src/schemas/rules";
import * as GenericSchema from "@lawbrador/shared/src/schemas/generic";
import EventFactory from "@lawbrador/events/src/eventFactory";
import { id } from "@lawbrador/shared/src/db/utils";
import { toIdentity } from "@lawbrador/shared/src/utils";
import { SOURCES_ENDPOINT } from "@lawbrador/shared/src/endpoints";
import { routeConfig } from "./utils";
export const sourceConfigRoutes = async (fastify, _options) => {
    fastify.get("/api/sources", routeConfig(RuleSchema.sourceSiteConfigs), async () => {
        return await fastify.collections.sourceConfigs.all();
    });
    fastify.post(SOURCES_ENDPOINT, routeConfig(GenericSchema.identity, RuleSchema.unsavedSourceSiteConfig), async (req) => {
        const newConfig = Object.assign(Object.assign({}, req.body), { _id: id() });
        await fastify.events.processSync(EventFactory.SourceConfigCreated({ sourceConfig: newConfig }));
        return toIdentity(newConfig._id);
    });
    fastify.put(SOURCES_ENDPOINT, routeConfig(GenericSchema.identity, RuleSchema.sourceSiteConfig), async (req) => {
        await fastify.events.processSync(EventFactory.SourceConfigUpdated({ sourceConfig: req.body }));
        return toIdentity(req.body._id);
    });
};
//# sourceMappingURL=source_configs.js.map
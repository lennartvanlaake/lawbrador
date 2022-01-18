import { hashObject } from "@lawbrador/shared/src/url";
export function routeConfig(response, request = null) {
    const options = { schema: {} };
    if (request) {
        options.schema.body = request;
    }
    options.schema.response = { 200: response };
    return options;
}
export function createHash(searchParams, config) {
    return hashObject(Object.assign(Object.assign({}, searchParams), { configId: config._id }));
}
//# sourceMappingURL=utils.js.map
export function routeConfig(response, request = null) {
    const options = { schema: {} };
    if (request) {
        options.schema.body = request;
    }
    options.schema.response = { 200: response };
    return options;
}
//# sourceMappingURL=utils.js.map
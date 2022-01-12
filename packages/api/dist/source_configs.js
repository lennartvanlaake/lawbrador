export const sourceConfigRoutes = async (fastify, _options) => {
    fastify.get('/api/sources', {}, async () => {
        //return await sourceConfigCollection.find({}).toArray();
    });
    fastify.post('/api/sources', {}, async (req) => {
        //await sourceConfigCollection.insertOne(req.body);
        //const inserted = req.body as SourceSiteConfig;
        //return inserted._id;
    });
};
//# sourceMappingURL=source_configs.js.map
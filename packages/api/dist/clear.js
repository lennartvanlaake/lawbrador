export const clearRoutes = async (fastify, _options) => {
    fastify.delete('/api/all', {}, async () => {
        const collections = await fastify.db.collections();
        collections.forEach(async (c) => {
            await c.deleteMany({});
        });
        return { status: 'success' };
    });
};
//# sourceMappingURL=clear.js.map
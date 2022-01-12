import { DB_NAME } from 'packages/shared/src/db/constants';
export const clearRoutes = async (fastify, _options) => {
    fastify.delete('/api/all', {}, async () => {
        const collections = await fastify.client.db(DB_NAME).collections();
        collections.forEach(async (c) => {
            await c.deleteMany({});
        });
        return { status: 'success' };
    });
};
//# sourceMappingURL=clear.js.map
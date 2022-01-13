import { clean } from '@lawbrador/shared/src/db/utils';
export const clearRoutes = async (fastify, _options) => {
    fastify.delete('all', {}, async () => {
        await clean(fastify.client);
        return { status: 'success' };
    });
};
//# sourceMappingURL=clear.js.map
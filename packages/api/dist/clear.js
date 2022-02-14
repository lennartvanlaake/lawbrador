import { Endpoints, clean } from '@lawbrador/shared';
export default async (fastify) => {
    fastify.delete(Endpoints.ALL, {}, async () => {
        await clean(fastify.client);
        return { status: 'success' };
    });
};
//# sourceMappingURL=clear.js.map
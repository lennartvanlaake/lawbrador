import { Endpoints } from '@lawbrador/shared';
import { clean } from '@lawbrador/db';
export default async (fastify) => {
    fastify.delete(Endpoints.ALL, {}, async () => {
        await clean(fastify.client);
        return { status: 'success' };
    });
};
//# sourceMappingURL=clear.js.map
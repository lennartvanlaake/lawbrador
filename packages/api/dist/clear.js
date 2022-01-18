import { clean } from '@lawbrador/shared/src/db/utils';
import { ALL_ENDPOINT } from '@lawbrador/shared/src/endpoints';
export default async (fastify) => {
    fastify.delete(ALL_ENDPOINT, {}, async () => {
        await clean(fastify.client);
        return { status: 'success' };
    });
};
//# sourceMappingURL=clear.js.map

import { LAWBRADOR_CLIENT as client } from '@lawbrador/shared/src/db/constants';
import { LAWBRADOR_REGISTRY as registry } from './index';
import {clean} from '@lawbrador/shared/src/db/utils';

export async function mochaGlobalTeardown() {
	await registry.close();
}

export async function mochaGlobalSetup() {
	await client.connect();
	await clean(client);
	registry.connect(client);
}

export const mochaHooks = {
	afterEach: async () => await clean(client)
}

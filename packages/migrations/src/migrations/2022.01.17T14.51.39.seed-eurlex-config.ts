import type { MigrationFn } from 'umzug';
import { eurlexConfig } from '@lawbrador/shared';
import { SOURCE_CONFIG_COLLECTION } from '@lawbrador/db';

export const up: MigrationFn = async () => {
	await SOURCE_CONFIG_COLLECTION.insert(eurlexConfig);
};
export const down: MigrationFn = async () => {
	await SOURCE_CONFIG_COLLECTION.raw!.deleteOne({ name: eurlexConfig.name });
};

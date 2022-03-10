import EventFactory from '../eventFactory';
import { LAWBRADOR_REGISTRY as registry } from '../index';
import { eurlexConfig } from '@lawbrador/shared';
import { expect } from 'chai';

// the DB connection and the cleaning betweens tests is done automagically in the testconfig.ts script
describe('Processing source config related events', () => {
	it('creates a new source config on created event', async () => {
		await registry.processSync(
			EventFactory.SourceConfigCreated({ sourceConfig: { ...eurlexConfig } })
		);
		const events = await registry.collections.events.all();
		const config = await registry.collections.sourceConfigs.get(eurlexConfig._id);
		expect(events.length).to.eq(1);
		expect(config._id).to.eq(eurlexConfig._id);
	});
	it('updates source config on updated event', async () => {
		const NEW_NAME = 'something else';
		await registry.processSync(
			EventFactory.SourceConfigCreated({ sourceConfig: { ...eurlexConfig } })
		);
		const newEurlex = { ...eurlexConfig };
		newEurlex.name = NEW_NAME;
		await registry.processSync(EventFactory.SourceConfigUpdated({ sourceConfig: newEurlex }));
		const config = await registry.collections.sourceConfigs.get(eurlexConfig._id);
		expect(config.name).to.eq(NEW_NAME);
	});
});

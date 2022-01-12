import {LAWBRADOR_CLIENT as client } from '@lawbrador/shared/src/db/constants';
import {clean} from '@lawbrador/shared/src/db/utils';
import EventFactory from '../eventFactory';
import { LAWBRADOR_REGISTRY as registry } from '../index';
import { eurlexConfig } from '@lawbrador/shared/src/examples';
import {expect} from 'chai';

describe("Processing source config related events", () => {
	it("creates a new source config on created event", async () => {
		await registry.processSync(EventFactory.SourceConfigCreated({ sourceConfig: { ...eurlexConfig } }))
		const events = await registry.collections.events.all();
		const config = await registry.collections.sourceConfigs.get(eurlexConfig._id);
		expect(events.length).to.eq(1);
		expect(config._id).to.eq(eurlexConfig._id);
	});
})

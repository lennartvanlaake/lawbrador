import { expect } from 'chai';
import { LawbradorEvent, EventProcessor, ProcessorRegistry } from './demo';
import { Db, MongoClient, Collection } from 'mongodb';

const DEMO_EVENT = 'DemoEvent';
interface DemoData {
	hello: string;
}

describe('Testing sync event processing', () => {
	const url =
		'mongodb://localhost:27017?replicaSet=rs0&readPreference=primary&ssl=false';
	const WORLD = 'world';
	let client: MongoClient;
	let db: Db;
	let eventCollection: Collection;
	let helloCollection: Collection;
	let registry: ProcessorRegistry;
	const demoEvent: LawbradorEvent<DemoData> = {
		timestamp: new Date().getTime(),
		type: DEMO_EVENT,
		data: {
			hello: WORLD,
		},
	};
	before(async () => {
		console.log('Before');
		client = await MongoClient.connect(url);
		db = client.db('lawbrador');
		eventCollection = db.collection('events');
		helloCollection = db.collection('hello');
	});
	beforeEach(async () => {
		console.log('Before each');
		await eventCollection.deleteMany({});
		await helloCollection.deleteMany({});
	});
	it('Testing happy flow', async () => {
		console.log('Start happy');
		registry = new ProcessorRegistry(db, client);
		const helloProcessor = new EventProcessor<DemoData>(
			DEMO_EVENT,
			async (e, session) => {
				await helloCollection.insertOne(
					{
						hello: e.data.hello,
					},
					{ session },
				);
			},
		);
		registry.registerProcessors([helloProcessor]);
		await registry.processSync({ ...demoEvent });
		const event: LawbradorEvent<DemoData> =
			(await eventCollection.findOne()) as any;
		console.log('End happy');
		expect(event.data.hello).to.eq(WORLD);
		const hello = await helloCollection.findOne();
		expect(hello.hello).to.eq(WORLD);
	});
	it('Event should not be committed if sync processing fails', async () => {
		console.log('Start error');
		registry = new ProcessorRegistry(db, client);
		const helloProcessor = new EventProcessor<DemoData>(
			DEMO_EVENT,
			() => {
				console.log('GOING BOOM');
				throw new Error('BOOM');
			},
		);
		registry.registerProcessors([helloProcessor]);
		let error: Error;
		try {
			await registry.processSync({ ...demoEvent });
		} catch (e) {
			error = e;
		}
		console.log('Stop error');
		expect(error).to.not.be.null;
		const event = await eventCollection.findOne();
		expect(event).to.be.null;
	});
	it('Happy flow async', async () => {
		registry = new ProcessorRegistry(db, client);
		const helloProcessor = new EventProcessor<DemoData>(
			DEMO_EVENT,
			async (e) => {
				console.log('processing async');
				await helloCollection.insertOne({
					hello: e.data.hello,
				});
			},
			'main',
			false,
		);
		registry.registerProcessors([helloProcessor]);
		registry.listenAsync();
		await new Promise((f) => setTimeout(f, 100));
		await registry.processSync({ ...demoEvent });
		await new Promise((f) => setTimeout(f, 1000));
		const event: LawbradorEvent<DemoData> =
			(await eventCollection.findOne()) as any;
		const hello = await helloCollection.findOne();
		expect(event.data.hello).to.eq(WORLD);
		expect(hello.hello).to.eq(WORLD);
	});
});

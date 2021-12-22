import { LawbradorEvent, EventProcessor, ProcessorRegistry } from './demo';

import { Db, MongoClient, Collection } from 'mongodb';

const DEMO_EVENT = 'DemoEvent';
interface DemoData {
	hello: string;
}

describe('Testing event processing', () => {
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
	beforeAll(async (done) => {
		client = await MongoClient.connect(url);
		db = client.db('db');
		eventCollection = db.collection('events');
		helloCollection = db.collection('hello');
		await done();
	});
	beforeEach(async (done) => {
		console.log('cleaning');
		await eventCollection.deleteMany({});
		await helloCollection.deleteMany({});
		await done();
	}, 100000000);
	test('Happy flow sync', async (done) => {
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
				console.log('processed...');
			},
		);
		try {
			registry.registerProcessors([helloProcessor]);
			await registry.processSync({ ...demoEvent });
			const event: LawbradorEvent<DemoData> =
				(await eventCollection.findOne()) as any;
			expect(event.data.hello).toBe(WORLD);
			const hello = await helloCollection.findOne();
			expect(hello.hello).toBe(WORLD);
		} finally {
			await done();
		}
	});
	test('Event should not be committed if sync processing fails', async (done) => {
		console.log('second test');
		registry = new ProcessorRegistry(db, client);
		const helloProcessor = new EventProcessor<DemoData>(
			DEMO_EVENT,
			async () => {
				console.log('messing up processing...');
				throw new Error('BOOM');
			},
		);
		registry.registerProcessors([helloProcessor]);
		try {
			registry.processSync({ ...demoEvent });
		} catch (e) {}
		const event = await eventCollection.findOne();
		expect(event).toBeFalsy();
		await done();
	});
	//test('Happy flow async', async () => {
	//registry = new ProcessorRegistry(db, client);
	//const helloProcessor = new EventProcessor<DemoData>(
	//DEMO_EVENT,
	//async (e) => {
	//console.log('processing async');
	//await helloCollection.insertOne({
	//hello: e.data.hello,
	//});
	//},
	//'main',
	//false,
	//);
	//registry.registerProcessors([helloProcessor]);
	//registry.listenAsync();
	//await new Promise((f) => setTimeout(f, 100));
	//await registry.saveEvent({ ...demoEvent });
	//await new Promise((f) => setTimeout(f, 1000));
	//const event: LawbradorEvent<DemoData> =
	//(await eventCollection.findOne()) as any;
	//const hello = await helloCollection.findOne();
	//expect(event.data.hello).toBe(WORLD);
	//expect(hello.hello).toBe(WORLD);
	//});
});

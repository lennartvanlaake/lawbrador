import {
	Db,
	MongoClient,
	Collection,
	ChangeStream,
	ClientSession,
} from 'mongodb';

const MAIN_PROCESSING_GROUP = 'main';

interface NewDemo {
	hello: string;
}

export class EventFactory {
	static Demo(data: NewDemo): LawbradorEvent<NewDemo> {
		return {
			type: 'DemoEvent',
			timestamp: new Date().getTime(),
			data: data,
		};
	}
}

export interface LawbradorEvent<Type> {
	type: string;
	timestamp: number;
	data: Type;
}

export class ProcessorRegistry {
	constructor(db: Db, client: MongoClient) {
		this.db = db;
		this.client = client;
		this.eventCollection = db.collection('events');
		this.processorRegistry = {};
	}
	db: Db;
	client: MongoClient;
	eventCollection: Collection;
	changeStream: ChangeStream;
	async doWithTransaction(f: (session: ClientSession) => Promise<void>) {
		const session = this.client.startSession();
		await session.withTransaction(async () => {
			let error: Error | null;
			try {
				await f(session);
				console.log('processing worked');
			} catch (e) {
				console.log(e);
				error = e;
				await session.abortTransaction();
			} finally {
				await session.endSession();
				console.log('session ended');
				if (error) {
					throw error;
				}
			}
		});
	}
	listenAsync(processingGroup: string = MAIN_PROCESSING_GROUP) {
		this.changeStream = this.eventCollection.watch([], {
			fullDocument: 'updateLookup',
		});
		this.changeStream.on('change', (next) => {
			this.processAsync(
				next.fullDocument as LawbradorEvent<any>,
				processingGroup,
			);
		});
	}
	async close() {
		if (this.changeStream) {
			await this.changeStream.close();
		}
		await this.client.close();
	}
	processorRegistry: Record<string, EventProcessor<any>[]>;
	registerProcessors(processors: EventProcessor<any>[]) {
		processors.forEach((p) => {
			this.processorRegistry[p.eventName] =
				this.processorRegistry[p.eventName] ??
				[].concat(p);
		});
	}
	async processSync(event: LawbradorEvent<any>) {
		await this.doWithTransaction(async (session) => {
			await this.saveEvent(event, session);
			const processors = this.processorRegistry[
				event.type
			].filter((p) => p.sync);
			for (let i = 0; i < processors.length; i++) {
				const processor = processors[i];
				await processor.process(event, session);
			}
		});
	}
	async saveEvent(event: LawbradorEvent<any>, session: ClientSession) {
		await this.eventCollection.insertOne(event, { session });
	}
	processAsync(event: LawbradorEvent<any>, processingGroup: string) {
		this.doWithTransaction(async (session) => {
			this.processorRegistry[event.type]
				.filter(
					(p) =>
						!p.sync &&
						p.processingGroup ==
							processingGroup,
				)
				.forEach((p) => p.process(event, session));
		});
	}
}

export class EventProcessor<EventType> {
	eventName: string;
	processingGroup: string;
	sync: boolean;
	process: (
		e: LawbradorEvent<EventType>,
		session: ClientSession,
	) => Promise<void>;
	constructor(
		eventName: string,
		process: (
			e: LawbradorEvent<EventType>,
			session: ClientSession,
		) => Promise<void>,
		processingGroupName: string = MAIN_PROCESSING_GROUP,
		sync: boolean = true,
	) {
		this.eventName = eventName;
		this.processingGroup = processingGroupName;
		this.process = process;
		this.sync = sync;
	}
}

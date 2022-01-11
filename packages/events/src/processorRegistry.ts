import {
	Db,
	MongoClient,
	ChangeStream,
	ClientSession,
} from 'mongodb';
import EventProcessor from './eventProcessor';
import { MAIN_PROCESSING_GROUP} from './types';
import type { LawbradorEvent } from '@lawbrador/shared/src/schemas/generic'
import { EVENT_COLLECTION } from '@lawbrador/shared/src/db/collections';
import { id } from '@lawbrador/shared/src/db/utils';

export default class ProcessorRegistry {
	constructor(client: MongoClient) {
		this.client = client;
		EVENT_COLLECTION.connect(client);
		this.processorRegistry = {};
	}
	db: Db;
	client: MongoClient;
	eventCollection = EVENT_COLLECTION; 
	changeStream: ChangeStream;
	async doWithTransaction(f: (session: ClientSession) => Promise<void>) {
		const session = this.client.startSession();
		await session.withTransaction(async () => {
			let error: Error | null;
			try {
				await f(session);
				console.log('processing worked');
				await session.commitTransaction();
			} catch (e) {
				console.log(e);
				error = e;
				await session.abortTransaction();
			} finally {
				await session.endSession();
				console.log('session ended');
				if (error) {
					debugger;
					throw error;
				}
			}
		});
	}
	listenAsync(processingGroup: string = MAIN_PROCESSING_GROUP) {
		this.changeStream = this.eventCollection.raw.watch([], {
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
		event._id = id();
		await this.eventCollection.insert(event, session);
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


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventProcessor = exports.ProcessorRegistry = exports.EventFactory = void 0;
const MAIN_PROCESSING_GROUP = 'main';
class EventFactory {
    static Demo(data) {
        return {
            type: 'DemoEvent',
            timestamp: new Date().getTime(),
            data: data,
        };
    }
}
exports.EventFactory = EventFactory;
class ProcessorRegistry {
    constructor(db, client) {
        this.db = db;
        this.client = client;
        this.eventCollection = db.collection('events');
        this.processorRegistry = {};
    }
    async doWithTransaction(f) {
        const session = this.client.startSession();
        await session.withTransaction(async () => {
            let error;
            try {
                await f(session);
                console.log('processing worked');
                await session.commitTransaction();
            }
            catch (e) {
                console.log(e);
                error = e;
                await session.abortTransaction();
            }
            finally {
                await session.endSession();
                console.log('session ended');
                if (error) {
                    debugger;
                    throw error;
                }
            }
        });
    }
    listenAsync(processingGroup = MAIN_PROCESSING_GROUP) {
        this.changeStream = this.eventCollection.watch([], {
            fullDocument: 'updateLookup',
        });
        this.changeStream.on('change', (next) => {
            this.processAsync(next.fullDocument, processingGroup);
        });
    }
    async close() {
        if (this.changeStream) {
            await this.changeStream.close();
        }
        await this.client.close();
    }
    registerProcessors(processors) {
        processors.forEach((p) => {
            var _a;
            this.processorRegistry[p.eventName] =
                (_a = this.processorRegistry[p.eventName]) !== null && _a !== void 0 ? _a : [].concat(p);
        });
    }
    async processSync(event) {
        await this.doWithTransaction(async (session) => {
            await this.saveEvent(event, session);
            const processors = this.processorRegistry[event.type].filter((p) => p.sync);
            for (let i = 0; i < processors.length; i++) {
                const processor = processors[i];
                await processor.process(event, session);
            }
        });
    }
    async saveEvent(event, session) {
        await this.eventCollection.insertOne(event, { session });
    }
    processAsync(event, processingGroup) {
        this.doWithTransaction(async (session) => {
            this.processorRegistry[event.type]
                .filter((p) => !p.sync &&
                p.processingGroup ==
                    processingGroup)
                .forEach((p) => p.process(event, session));
        });
    }
}
exports.ProcessorRegistry = ProcessorRegistry;
class EventProcessor {
    constructor(eventName, process, processingGroupName = MAIN_PROCESSING_GROUP, sync = true) {
        this.eventName = eventName;
        this.processingGroup = processingGroupName;
        this.process = process;
        this.sync = sync;
    }
}
exports.EventProcessor = EventProcessor;
//# sourceMappingURL=demo.js.map
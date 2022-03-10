import { expect } from "chai";
import ProcessorRegistry from "./processorRegistry";
import EventProcessor from "./eventProcessor";
import { EVENT_COLLECTION } from "@lawbrador/shared/src/db/collections";
import { TypedCollection } from "@lawbrador/shared/src/db/Collection";
import { clean, id } from "@lawbrador/shared/src/db/utils";
import {
  Identity,
  LawbradorEvent,
} from "@lawbrador/shared/src/schemas/generic";
import { LAWBRADOR_CLIENT as client } from "@lawbrador/shared/src/db/constants";

const DEMO_EVENT = "DemoEvent";
interface DemoData extends Identity {
  hello: string;
}

describe("Testing sync event processing", () => {
  const WORLD = "world";
  const eventCollection = EVENT_COLLECTION;
  const helloCollection = new TypedCollection<DemoData>("hello");
  let registry: ProcessorRegistry;
  const helloId = id();
  const demoEvent: LawbradorEvent<DemoData> = {
    type: DEMO_EVENT,
    data: {
      _id: helloId,
      hello: WORLD,
    },
  };
  before(async () => {
    console.log("Before");
    await client.connect();
    eventCollection.connect(client);
    helloCollection.connect(client);
  });
  after(async () => {
    await registry.close();
  });
  beforeEach(async () => {
    console.log("Before each");
    await clean(client);
  });
  it("Testing happy flow", async () => {
    console.log("Start happy");
    registry = new ProcessorRegistry();
    registry.connect(client);
    const helloProcessor = new EventProcessor<DemoData>(
      DEMO_EVENT,
      async (e, _, session) => {
        await helloCollection.insert(e.data, session);
      }
    );
    registry.registerProcessors([helloProcessor]);
    await registry.processSync({ ...demoEvent });
    const event: LawbradorEvent<DemoData> = (await eventCollection.all())[0];
    console.log("End happy");
    expect(event.data.hello).to.eq(WORLD);
    const hello = await helloCollection.get(helloId);
    expect(hello.hello).to.eq(WORLD);
  });
  it("Event should not be committed if sync processing fails", async () => {
    console.log("Start error");
    registry = new ProcessorRegistry();
    registry.connect(client);
    const helloProcessor = new EventProcessor<DemoData>(DEMO_EVENT, () => {
      console.log("GOING BOOM");
      throw new Error("BOOM");
    });
    registry.registerProcessors([helloProcessor]);
    let error: Error;
    try {
      await registry.processSync({ ...demoEvent });
    } catch (e) {
      error = e;
    }
    console.log("Stop error");
    expect(error).to.not.be.null;
    const events = await eventCollection.all();
    expect(events).to.be.empty;
  });
  it("Happy flow async", async () => {
    registry = new ProcessorRegistry();
    registry.connect(client);
    const helloProcessor = new EventProcessor<DemoData>(
      DEMO_EVENT,
      async (e) => {
        console.log("processing async");
        await helloCollection.insert(e.data);
      },
      "main",
      false
    );
    registry.registerProcessors([helloProcessor]);
    registry.listenAsync();
    await new Promise((f) => setTimeout(f, 100));
    await registry.processSync({ ...demoEvent });
    await new Promise((f) => setTimeout(f, 1000));
    const event: LawbradorEvent<DemoData> = (await eventCollection.all())[0];
    const hello = await helloCollection.get(helloId);
    expect(event.data.hello).to.eq(WORLD);
    expect(hello.hello).to.eq(WORLD);
  });
});

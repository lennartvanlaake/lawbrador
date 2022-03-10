import { MAIN_PROCESSING_GROUP } from "./types";
import type { LawbradorEvent } from "@lawbrador/shared";
import type { ClientSession } from "mongodb";
import type ProcessorRegistry from "./processorRegistry";

export default class EventProcessor<EventType> {
  eventName: string;
  processingGroup: string;
  sync: boolean;
  process: (
    e: LawbradorEvent<EventType>,
    registry: ProcessorRegistry,
    session: ClientSession
  ) => Promise<void>;
  constructor(
    eventName: string,
    process: (
      e: LawbradorEvent<EventType>,
      registry: ProcessorRegistry,
      session: ClientSession
    ) => Promise<void>,
    processingGroupName: string = MAIN_PROCESSING_GROUP,
    sync = true
  ) {
    this.eventName = eventName;
    this.processingGroup = processingGroupName;
    this.process = process;
    this.sync = sync;
  }
}

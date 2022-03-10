import ProcessorRegistry from "./processorRegistry";
import { SOURCE_CONFIG_PROCESSORS } from "./processors/sourceConfig";

export { default as EventFactory } from "./eventFactory";
export { default as ProcessorRegistry } from "./processorRegistry";
export const LAWBRADOR_REGISTRY = new ProcessorRegistry();
LAWBRADOR_REGISTRY.registerProcessors(SOURCE_CONFIG_PROCESSORS);

import ProcessorRegistry from "./processorRegistry";
import { ANNOTATION_PROCESSORS } from "./processors/annotations";
import { SOURCE_CONFIG_PROCESSORS } from "./processors/sourceConfig";

export { default as EventFactory } from "./eventFactory";
export { default as ProcessorRegistry } from "./processorRegistry";
export const LAWBRADOR_REGISTRY = new ProcessorRegistry();
LAWBRADOR_REGISTRY.registerProcessors(SOURCE_CONFIG_PROCESSORS);
LAWBRADOR_REGISTRY.registerProcessors(ANNOTATION_PROCESSORS);

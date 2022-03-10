import {
  SourceConfigCreated,
  SourceConfigUpdated,
  SOURCE_CONFIG_CREATED,
  SOURCE_CONFIG_UPDATED,
} from "../eventFactory";
import EventProcessor from "../eventProcessor";

const INSERT_SOURCE_CONFIG_PROCESSOR = new EventProcessor<SourceConfigCreated>(
  SOURCE_CONFIG_CREATED,
  async (e, registry, session) => {
    await registry.collections.sourceConfigs.insert(
      e.data.sourceConfig,
      session
    );
  }
);
const UPDATE_SOURCE_CONFIG_PROCESSOR = new EventProcessor<SourceConfigUpdated>(
  SOURCE_CONFIG_UPDATED,
  async (e, registry, session) => {
    await registry.collections.sourceConfigs.replace(
      e.data.sourceConfig,
      session
    );
  }
);

export const SOURCE_CONFIG_PROCESSORS = [
  INSERT_SOURCE_CONFIG_PROCESSOR,
  UPDATE_SOURCE_CONFIG_PROCESSOR,
];

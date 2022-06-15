import type { AnnotationCreated, AnnotationUpdated } from "../eventFactory";
import { ANNOTATION_CREATED, ANNOTATION_UPDATED } from "../eventFactory";
import EventProcessor from "../eventProcessor";

const INSERT_ANNOTATION_PROCESSOR = new EventProcessor<AnnotationCreated>(
  ANNOTATION_CREATED,
  async (e, registry, session) => {
    await registry.collections.annotations.insert(
      e.data.annotation,
      session
    );
  }
);
const UPDATE_ANNOTATION_PROCESSOR = new EventProcessor<AnnotationUpdated>(
  ANNOTATION_UPDATED,
  async (e, registry, session) => {
    await registry.collections.annotations.replace(
      e.data.annotation,
      session
    );
  }
);

export const ANNOTATION_PROCESSORS = [
  INSERT_ANNOTATION_PROCESSOR,
  UPDATE_ANNOTATION_PROCESSOR,
];

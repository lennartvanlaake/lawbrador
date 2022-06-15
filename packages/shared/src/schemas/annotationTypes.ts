import type { Static } from "@sinclair/typebox";
import type { annotation, marking, startAndEndPosition, unsavedAnnotation } from './annotation';

export type Marking = Static<typeof marking>;
export type Annotation = Static<typeof annotation>;
export type UnsavedAnnotation = Static<typeof unsavedAnnotation>;
export type StartAndEndPosition = Static<typeof startAndEndPosition>
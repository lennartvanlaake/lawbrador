import type { Static } from "@sinclair/typebox";
import type { annotation, marking, startAndEndPosition } from './annotation';

export type Marking = Static<typeof marking>;
export type Annotation = Static<typeof annotation>;
export type StartAndEndPosition = Static<typeof startAndEndPosition>
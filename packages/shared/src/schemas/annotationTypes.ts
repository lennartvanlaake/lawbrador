import type { Static } from "@sinclair/typebox";
import type { marking, startAndEndPosition } from './annotation';

export type Marking = Static<typeof marking>;
export type StartAndEndPosition = Static<typeof startAndEndPosition>
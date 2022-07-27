import type { Static } from '@sinclair/typebox';
import type { getMultipleRequest } from './requests';

export type GetMultipleRequest = Static<typeof getMultipleRequest>;
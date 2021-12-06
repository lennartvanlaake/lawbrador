import { Static, Type } from '@sinclair/typebox';

export interface Identity {
	id: string;
}

export enum ResponseStatus {
	success,
	failed,
}

export const statusResponse = Type.Object({
	status: Type.Enum(ResponseStatus),
});

export type StatusResponse = Static<typeof statusResponse>;

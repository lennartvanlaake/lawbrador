import { Static, Type } from '@sinclair/typebox';
import type { ObjectId } from 'mongodb';

export interface Identity {
	_id: string;
}

export interface MongoIdentity {
	_id: string | ObjectId;
}
export interface LawbradorEvent<T> extends Identity {
	type: string;
	data: T;
}

export enum ResponseStatus {
	success,
	failed,
}

export const statusResponse = Type.Object({
	status: Type.Enum(ResponseStatus),
});

export type StatusResponse = Static<typeof statusResponse>;

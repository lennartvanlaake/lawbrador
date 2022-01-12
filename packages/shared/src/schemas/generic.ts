import { Static, Type } from '@sinclair/typebox';
import type { ObjectId } from 'mongodb';

export const identity = Type.Object({
	_id: Type.String(),
});

export type Identity = Static<typeof identity>;

export interface MongoIdentity {
	_id:  ObjectId;
}
export interface LawbradorEvent<T> {
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

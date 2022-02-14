import {  Type } from '@sinclair/typebox';

export const identity = Type.Object({
	_id: Type.String(),
});

export const hashed = Type.Object({
	hash: Type.String()
})

export enum ResponseStatus {
	success,
	failed,
}

export const statusResponse = Type.Object({
	status: Type.Enum(ResponseStatus),
});


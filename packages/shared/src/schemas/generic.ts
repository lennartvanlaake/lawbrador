import {  Type } from '@sinclair/typebox';

export const identity = Type.Object({
	_id: Type.String(),
});

export const hashed = Type.Object({
	hash: Type.String()
})

export const errorResponse = Type.Object({
	message: Type.String(),
});


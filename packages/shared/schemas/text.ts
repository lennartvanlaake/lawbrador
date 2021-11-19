import { Static, Type } from '@sinclair/typebox';

export const document = Type.Object({
	text: Type.String(),
	_id: Type.String(),
});

export type Document = Static<typeof document>;

export const documentUpload = Type.Omit(document, ['_id']);

export type DocumentUpload = Static<typeof documentUpload>;

export const documents = Type.Array(document);

export type Documents = Static<typeof documents>;

export enum ResponseStatus {
	success,
	failed,
}

export const statusResponse = Type.Object({
	status: Type.Enum(ResponseStatus),
});

export type StatusResponse = Static<typeof statusResponse>;

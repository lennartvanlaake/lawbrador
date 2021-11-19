import { Static, Type } from '@sinclair/typebox';

export const document = Type.Object({
	created: Type.String({ format: 'date-time' }),
	text: Type.String(),
	_id: Type.String(),
});

export type Document = Static<typeof document>;

export const documentUpload = Type.Omit(document, ['_id', 'created']);

export type DocumentUpload = Static<typeof documentUpload>;

export const documents = Type.Array(document);

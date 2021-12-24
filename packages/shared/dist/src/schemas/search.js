import { Type } from '@sinclair/typebox';
export const documentSummary = Type.Object({
    id: Type.String(),
}, { $id: 'searchDocumentSummary' });
export const searchResult = Type.Object({
    text: Type.String(),
    href: Type.String(),
    hash: Type.String(),
    document: Type.Optional(Type.Ref(documentSummary)),
});
export const searchRequest = Type.Object({
    sourceConfigId: Type.String(),
    searchParams: Type.Record(Type.String(), Type.String()),
});
//# sourceMappingURL=search.js.map
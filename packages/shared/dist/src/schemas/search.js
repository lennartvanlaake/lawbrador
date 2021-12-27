"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRequest = exports.searchResult = exports.documentSummary = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.documentSummary = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
}, { $id: 'searchDocumentSummary' });
exports.searchResult = typebox_1.Type.Object({
    text: typebox_1.Type.String(),
    href: typebox_1.Type.String(),
    hash: typebox_1.Type.String(),
    document: typebox_1.Type.Optional(typebox_1.Type.Ref(exports.documentSummary)),
});
exports.searchRequest = typebox_1.Type.Object({
    sourceConfigId: typebox_1.Type.String(),
    searchParams: typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.String()),
});
//# sourceMappingURL=search.js.map
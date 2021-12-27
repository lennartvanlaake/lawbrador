"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restructuredDocument = exports.restructuredNode = exports.scrapeRequest = exports.scrapeEvent = exports.parsedNode = exports.parsedNodeProperties = exports.parsedNodeData = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.parsedNodeData = typebox_1.Type.Object({
    href: typebox_1.Type.Optional(typebox_1.Type.String()),
    text: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.parsedNodeProperties = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
    id: typebox_1.Type.Optional(typebox_1.Type.String()),
    class: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.parsedNode = typebox_1.Type.Rec((Self) => typebox_1.Type.Object({
    meta: typebox_1.Type.Any(),
    chain: typebox_1.Type.Array(typebox_1.Type.Ref(exports.parsedNodeProperties)),
    data: typebox_1.Type.Array(typebox_1.Type.Ref(exports.parsedNodeData)),
    children: typebox_1.Type.Optional(typebox_1.Type.Array(Self)),
}), { $id: 'parsedNode' });
exports.scrapeEvent = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    url: typebox_1.Type.String(),
    hash: typebox_1.Type.String(),
    type: typebox_1.Type.Literal('scrape'),
    timestamp: typebox_1.Type.Number(),
    bodyNode: typebox_1.Type.Ref(exports.parsedNode),
    sourceConfigId: typebox_1.Type.String(),
}, { $id: 'scrapeEvent' });
exports.scrapeRequest = typebox_1.Type.Object({
    url: typebox_1.Type.String(),
    sourceConfigId: typebox_1.Type.String(),
});
// output after all mutations have been applied
exports.restructuredNode = typebox_1.Type.Rec((Self) => typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
    href: typebox_1.Type.Optional(typebox_1.Type.String()),
    text: typebox_1.Type.Optional(typebox_1.Type.String()),
    children: typebox_1.Type.Optional(typebox_1.Type.Array(Self)),
}), { $id: 'restructuredNode' });
exports.restructuredDocument = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    hash: typebox_1.Type.String(),
    scrapeId: typebox_1.Type.String(),
    url: typebox_1.Type.String(),
    timestamp: typebox_1.Type.Number(),
    nodes: typebox_1.Type.Array(typebox_1.Type.Ref(exports.restructuredNode)),
});
//# sourceMappingURL=document_version.js.map
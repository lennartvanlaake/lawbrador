"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceSiteConfig = exports.urlConfig = exports.urlComponent = exports.valueWithDisplayName = exports.htmlSearchRuleSet = exports.documentRuleSet = exports.selectionRule = exports.selectionLocation = exports.selectionOperator = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.selectionOperator = typebox_1.Type.Union([typebox_1.Type.Literal('is'), typebox_1.Type.Literal('includes')], {
    $id: 'selectionOperator',
});
exports.selectionLocation = typebox_1.Type.Union([typebox_1.Type.Literal('tag'), typebox_1.Type.Literal('class'), typebox_1.Type.Literal('id')], { $id: 'selectionLocation' });
exports.selectionRule = typebox_1.Type.Object({
    op: typebox_1.Type.Ref(exports.selectionOperator),
    location: typebox_1.Type.Ref(exports.selectionLocation),
    value: typebox_1.Type.String(),
}, { $id: 'selectionRule' });
exports.documentRuleSet = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    conditionRules: typebox_1.Type.Array(typebox_1.Type.Ref(exports.selectionRule)),
    bodyRule: typebox_1.Type.Optional(typebox_1.Type.Ref(exports.selectionRule)),
});
exports.htmlSearchRuleSet = typebox_1.Type.Object({
    pageVariable: typebox_1.Type.String(),
    queryVariable: typebox_1.Type.String(),
    resultListRule: typebox_1.Type.Ref(exports.selectionRule),
    resultLinkRule: typebox_1.Type.Ref(exports.selectionRule),
    resultRule: typebox_1.Type.Ref(exports.selectionRule),
    resultDescriptionRule: typebox_1.Type.Optional(typebox_1.Type.Ref(exports.selectionRule)),
});
exports.valueWithDisplayName = typebox_1.Type.Object({
    value: typebox_1.Type.String(),
    displayName: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.urlComponent = typebox_1.Type.Object({
    value: typebox_1.Type.Optional(typebox_1.Type.String()),
    variableName: typebox_1.Type.Optional(typebox_1.Type.String()),
    possibleValues: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Ref(exports.valueWithDisplayName))),
}, { $id: 'urlComponent' });
exports.urlConfig = typebox_1.Type.Object({
    base: typebox_1.Type.String({ format: 'uri' }),
    pathComponents: typebox_1.Type.Array(typebox_1.Type.Ref(exports.urlComponent)),
    queryComponents: typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Ref(exports.urlComponent)),
});
exports.sourceSiteConfig = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    searchUrlConfig: typebox_1.Type.Ref(exports.urlConfig),
    documentUrlConfig: typebox_1.Type.Ref(exports.urlConfig),
    documentRuleSets: typebox_1.Type.Array(typebox_1.Type.Ref(exports.documentRuleSet)),
    htmlSearchRuleSet: typebox_1.Type.Ref(exports.htmlSearchRuleSet),
});
//# sourceMappingURL=rules.js.map
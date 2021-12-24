import { Type } from '@sinclair/typebox';
export const selectionOperator = Type.Union([Type.Literal('is'), Type.Literal('includes')], {
    $id: 'selectionOperator',
});
export const selectionLocation = Type.Union([Type.Literal('tag'), Type.Literal('class'), Type.Literal('id')], { $id: 'selectionLocation' });
export const selectionRule = Type.Object({
    op: Type.Ref(selectionOperator),
    location: Type.Ref(selectionLocation),
    value: Type.String(),
}, { $id: 'selectionRule' });
export const documentRuleSet = Type.Object({
    id: Type.String(),
    conditionRules: Type.Array(Type.Ref(selectionRule)),
    bodyRule: Type.Optional(Type.Ref(selectionRule)),
});
export const htmlSearchRuleSet = Type.Object({
    pageVariable: Type.String(),
    queryVariable: Type.String(),
    resultListRule: Type.Ref(selectionRule),
    resultLinkRule: Type.Ref(selectionRule),
    resultRule: Type.Ref(selectionRule),
    resultDescriptionRule: Type.Optional(Type.Ref(selectionRule)),
});
export const valueWithDisplayName = Type.Object({
    value: Type.String(),
    displayName: Type.Optional(Type.String()),
});
export const urlComponent = Type.Object({
    value: Type.Optional(Type.String()),
    variableName: Type.Optional(Type.String()),
    possibleValues: Type.Optional(Type.Array(Type.Ref(valueWithDisplayName))),
}, { $id: 'urlComponent' });
export const urlConfig = Type.Object({
    base: Type.String({ format: 'uri' }),
    pathComponents: Type.Array(Type.Ref(urlComponent)),
    queryComponents: Type.Record(Type.String(), Type.Ref(urlComponent)),
});
export const sourceSiteConfig = Type.Object({
    id: Type.String(),
    name: Type.String(),
    searchUrlConfig: Type.Ref(urlConfig),
    documentUrlConfig: Type.Ref(urlConfig),
    documentRuleSets: Type.Array(Type.Ref(documentRuleSet)),
    htmlSearchRuleSet: Type.Ref(htmlSearchRuleSet),
});
//# sourceMappingURL=rules.js.map
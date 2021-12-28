import { Static } from '@sinclair/typebox';
export declare const ALL_SELECTION_OPERATORS: readonly ["is", "includes"];
export declare const selectionOperator: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
export declare type SelectionOperator = typeof ALL_SELECTION_OPERATORS[number];
export declare const ALL_SELECTION_LOCATIONS: readonly ["tag", "class", "id"];
export declare const selectionLocation: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
export declare type SelectionLocation = typeof ALL_SELECTION_LOCATIONS[number];
export declare const selectionRule: import("@sinclair/typebox").TObject<{
    op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
    location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
    value: import("@sinclair/typebox").TString;
}>;
export declare type SelectionRule = Static<typeof selectionRule>;
export declare const documentRuleSet: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    conditionRules: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
        location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
        value: import("@sinclair/typebox").TString;
    }>>;
    bodyRule: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
        location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
        value: import("@sinclair/typebox").TString;
    }>>;
}>;
export declare type DocumentRuleSet = Static<typeof documentRuleSet>;
export declare const htmlSearchRuleSet: import("@sinclair/typebox").TObject<{
    pageVariable: import("@sinclair/typebox").TString;
    queryVariable: import("@sinclair/typebox").TString;
    resultListRule: import("@sinclair/typebox").TObject<{
        op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
        location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
        value: import("@sinclair/typebox").TString;
    }>;
    resultLinkRule: import("@sinclair/typebox").TObject<{
        op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
        location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
        value: import("@sinclair/typebox").TString;
    }>;
    resultRule: import("@sinclair/typebox").TObject<{
        op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
        location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
        value: import("@sinclair/typebox").TString;
    }>;
    resultDescriptionRule: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
        location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
        value: import("@sinclair/typebox").TString;
    }>>;
}>;
export declare type HtmlSearchRuleSet = Static<typeof htmlSearchRuleSet>;
export declare const valueWithDisplayName: import("@sinclair/typebox").TObject<{
    value: import("@sinclair/typebox").TString;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const urlComponent: import("@sinclair/typebox").TObject<{
    value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    variableName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    possibleValues: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        value: import("@sinclair/typebox").TString;
        displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>>;
}>;
export declare type UrlComponent = Static<typeof urlComponent>;
export declare const urlConfig: import("@sinclair/typebox").TObject<{
    base: import("@sinclair/typebox").TString;
    pathComponents: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        variableName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        possibleValues: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            value: import("@sinclair/typebox").TString;
            displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>>;
    }>>;
    queryComponents: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TObject<{
        value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        variableName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        possibleValues: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            value: import("@sinclair/typebox").TString;
            displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>>;
    }>>;
}>;
export declare type UrlConfig = Static<typeof urlConfig>;
export declare const sourceSiteConfig: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    searchUrlConfig: import("@sinclair/typebox").TObject<{
        base: import("@sinclair/typebox").TString;
        pathComponents: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            variableName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            possibleValues: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                value: import("@sinclair/typebox").TString;
                displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            }>>>;
        }>>;
        queryComponents: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TObject<{
            value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            variableName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            possibleValues: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                value: import("@sinclair/typebox").TString;
                displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            }>>>;
        }>>;
    }>;
    documentUrlConfig: import("@sinclair/typebox").TObject<{
        base: import("@sinclair/typebox").TString;
        pathComponents: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            variableName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            possibleValues: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                value: import("@sinclair/typebox").TString;
                displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            }>>>;
        }>>;
        queryComponents: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TObject<{
            value: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            variableName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            possibleValues: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                value: import("@sinclair/typebox").TString;
                displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            }>>>;
        }>>;
    }>;
    documentRuleSets: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        conditionRules: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
            location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
            value: import("@sinclair/typebox").TString;
        }>>;
        bodyRule: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
            location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
            value: import("@sinclair/typebox").TString;
        }>>;
    }>>;
    htmlSearchRuleSet: import("@sinclair/typebox").TObject<{
        pageVariable: import("@sinclair/typebox").TString;
        queryVariable: import("@sinclair/typebox").TString;
        resultListRule: import("@sinclair/typebox").TObject<{
            op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
            location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
            value: import("@sinclair/typebox").TString;
        }>;
        resultLinkRule: import("@sinclair/typebox").TObject<{
            op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
            location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
            value: import("@sinclair/typebox").TString;
        }>;
        resultRule: import("@sinclair/typebox").TObject<{
            op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
            location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
            value: import("@sinclair/typebox").TString;
        }>;
        resultDescriptionRule: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
            op: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"is" | "includes">[]>;
            location: import("@sinclair/typebox").TUnion<import("@sinclair/typebox").TLiteral<"id" | "class" | "tag">[]>;
            value: import("@sinclair/typebox").TString;
        }>>;
    }>;
}>;
export declare type SourceSiteConfig = Static<typeof sourceSiteConfig>;

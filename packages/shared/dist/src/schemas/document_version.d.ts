import { Static } from '@sinclair/typebox';
export declare const parsedNodeData: import("@sinclair/typebox").TObject<{
    href: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    text: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare type ParsedNodeData = Static<typeof parsedNodeData>;
export declare const parsedNodeProperties: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    class: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const parsedNode: import("@sinclair/typebox").TObject<{
    meta: import("@sinclair/typebox").TAny;
    chain: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        class: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    data: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        href: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        text: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>>;
    children: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
}>;
export interface ParsedNode extends Static<typeof parsedNode> {
    children?: ParsedNode[];
}
export declare const scrapeEvent: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    url: import("@sinclair/typebox").TString;
    hash: import("@sinclair/typebox").TString;
    type: import("@sinclair/typebox").TLiteral<"scrape">;
    timestamp: import("@sinclair/typebox").TNumber;
    bodyNode: import("@sinclair/typebox").TObject<{
        meta: import("@sinclair/typebox").TAny;
        chain: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            class: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>;
        data: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            href: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
            text: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        }>>;
        children: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
    }>;
    sourceConfigId: import("@sinclair/typebox").TString;
}>;
export declare type ScrapeEvent = Static<typeof scrapeEvent>;
export declare const scrapeRequest: import("@sinclair/typebox").TObject<{
    url: import("@sinclair/typebox").TString;
    sourceConfigId: import("@sinclair/typebox").TString;
}>;
export declare type ScrapeRequest = Static<typeof scrapeRequest>;
export declare const restructuredNode: import("@sinclair/typebox").TObject<{
    name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    href: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    text: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    children: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
}>;
export declare type RestructuredNode = Static<typeof restructuredNode>;
export declare const restructuredDocument: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    hash: import("@sinclair/typebox").TString;
    scrapeId: import("@sinclair/typebox").TString;
    url: import("@sinclair/typebox").TString;
    timestamp: import("@sinclair/typebox").TNumber;
    nodes: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        name: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        href: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        text: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        children: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TAny>>;
    }>>;
}>;
export declare type RestructuredDocument = Static<typeof restructuredDocument>;

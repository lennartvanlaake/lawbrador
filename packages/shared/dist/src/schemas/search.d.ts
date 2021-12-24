import { Static } from '@sinclair/typebox';
export declare const documentSummary: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
}>;
export declare type DocumentSummary = Static<typeof documentSummary>;
export declare const searchResult: import("@sinclair/typebox").TObject<{
    text: import("@sinclair/typebox").TString;
    href: import("@sinclair/typebox").TString;
    hash: import("@sinclair/typebox").TString;
    document: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
    }>>;
}>;
export declare type SearchResult = Static<typeof searchResult>;
export declare const searchRequest: import("@sinclair/typebox").TObject<{
    sourceConfigId: import("@sinclair/typebox").TString;
    searchParams: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TString>;
}>;
export declare type SearchRequest = Static<typeof searchRequest>;

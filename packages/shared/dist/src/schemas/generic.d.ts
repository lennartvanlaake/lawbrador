import { Static } from '@sinclair/typebox';
export interface Identity {
    id: string;
}
export declare enum ResponseStatus {
    success = 0,
    failed = 1
}
export declare const statusResponse: import("@sinclair/typebox").TObject<{
    status: import("@sinclair/typebox").TEnum<import("@sinclair/typebox").TEnumKey<ResponseStatus>[]>;
}>;
export declare type StatusResponse = Static<typeof statusResponse>;

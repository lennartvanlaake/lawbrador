import { UrlConfig } from 'packages/shared/src/schemas/rules';
export declare function hashObject(obj: any): string;
export declare function hashUrlVariables(variables: any, config: UrlConfig): string;
export declare function buildUrl(variables: Record<string, string>, config: UrlConfig): string;
export declare function extractUrlVariables(url: string, config: UrlConfig): any;

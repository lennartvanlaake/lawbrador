import { ParsedNode } from 'packages/shared/src/schemas/document_version';
interface NodeAttributes {
    id?: string;
    class?: string;
    href?: string;
}
declare module 'cheerio' {
    interface Node {
        children?: Node[];
        data?: string;
        name?: string;
        attribs?: NodeAttributes;
    }
}
export declare function parse(html: string): ParsedNode;
export declare function scrape(url: string): Promise<ParsedNode>;
export {};

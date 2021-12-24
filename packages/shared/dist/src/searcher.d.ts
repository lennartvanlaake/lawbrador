import { SourceSiteConfig, HtmlSearchRuleSet } from 'packages/shared/src/schemas/rules';
import { ParsedNode } from 'packages/shared/src/schemas/document_version';
import { SearchResult } from 'packages/shared/src/schemas/search';
export declare function search(searchInput: Record<string, string>, config: SourceSiteConfig): Promise<SearchResult[]>;
export declare function incrementPageNumber(searchInput: Record<string, string>, config: HtmlSearchRuleSet): Record<string, string>;
export declare function parseSearchResults(root: ParsedNode, config: SourceSiteConfig): SearchResult[];

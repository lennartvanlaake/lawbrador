import { ParsedNode, RestructuredNode } from 'packages/shared/src/schemas/document_version';
import { DocumentRuleSet, SourceSiteConfig } from 'packages/shared/src/schemas/rules';
export declare function applyConfig(root: ParsedNode, config: SourceSiteConfig): RestructuredNode[];
export declare function selectRuleSet(root: ParsedNode, config: SourceSiteConfig): DocumentRuleSet;
export declare function applyRuleSet(root: ParsedNode, rules: DocumentRuleSet): RestructuredNode[];

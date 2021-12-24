import { ParsedNode } from 'packages/shared/src/schemas/document_version';
import { SelectionRule } from 'packages/shared/src/schemas/rules';
export declare function matches(node: ParsedNode, rule: SelectionRule): boolean;
export declare function getFirstMatching(node: ParsedNode, rule: SelectionRule): ParsedNode;
export declare function getAllMatching(node: ParsedNode, rule: SelectionRule): ParsedNode[];

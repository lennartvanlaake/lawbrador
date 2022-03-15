import type { Static } from "@sinclair/typebox";
import type {
  parsedNode,
  restructuredDocument,
  scrapeRequest,
  scrapeResult,
} from "./scrape";

export type ScrapeResult = Static<typeof scrapeResult>;
export type ScrapeRequest = Static<typeof scrapeRequest>;
export type RestructuredNode =
  | LinkNode
  | OtherNode
  | ListElementNode
  | TextNode;
export interface ParsedNode extends Static<typeof parsedNode> {
  children?: ParsedNode[];
}
export interface BaseRestructuredNode {
  name: string;
  id: string;
  children: RestructuredNode[] | undefined;
}

export interface LinkNode extends BaseRestructuredNode {
  name: "a";
  href: string;
}

export interface ListElementNode extends BaseRestructuredNode {
  name: "li";
  marker: TextNode | null;
}

export interface TextNode extends BaseRestructuredNode {
  name: "text" | "li-marker";
  text: string;
}

export interface OtherNode extends BaseRestructuredNode {
  name: "div" | "ol" | "p" | "h1" | "h2" | "h3" | "inline" | "hidden";
}

export interface RestructuredDocument {
  hash: string,
  url: string,
  body: RestructuredNode
}

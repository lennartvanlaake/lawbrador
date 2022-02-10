import { Static, Type } from "@sinclair/typebox";
import {TagName, tagName} from "./tags";

export const parsedNode = Type.Object({
  name: Type.Optional(Type.String()),
  id: Type.Optional(Type.String()),
  class: Type.Optional(Type.String()),
  href: Type.Optional(Type.String()),
  text: Type.Optional(Type.String()),
  children: Type.Optional(Type.Array(Type.Any())),
});

export interface ParsedNode extends Static<typeof parsedNode> {
  children?: ParsedNode[];
}

export const scrapeResult = Type.Object({
  url: Type.String(),
  hash: Type.String(),
  body: parsedNode,
});

export type ScrapeResult = Static<typeof scrapeResult>;

export const scrapeRequest = Type.Object({
  url: Type.String(),
  sourceConfigId: Type.String(),
});

export type ScrapeRequest = Static<typeof scrapeRequest>;

// output after all mutations have been applied (limited checking because schema would get too complex)
export const restructuredNode = Type.Object({
  name: tagName,
  children: Type.Optional(Type.Array(Type.Any())),
});

export interface BaseRestructuredNode {
  name: string 
  children: RestructuredNode[] | undefined
}

export interface LinkNode extends BaseRestructuredNode {
  name: "a",
  href: string,
} 

export interface ListElementNode extends BaseRestructuredNode {
  name: "li"
  marker: TextNode | null
}

export interface TextNode extends BaseRestructuredNode {
  name: "text" | "li-marker"
  text: string
} 

export interface OtherNode extends BaseRestructuredNode {
  name: "div" | "ol" | "p" | "h1" | "h2" | "h3" | "hidden"
}

export type RestructuredNode = LinkNode | OtherNode | ListElementNode | TextNode

export const restructuredDocument = Type.Object({
  hash: Type.String(),
  url: Type.String(),
  body: restructuredNode,
});

export type RestructuredDocument = Static<typeof restructuredDocument>;

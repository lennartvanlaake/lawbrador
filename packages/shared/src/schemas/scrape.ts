import { Static, Type } from "@sinclair/typebox";
import {tagName} from "./tags";

export const parsedNodeData = Type.Object({
  href: Type.Optional(Type.String()),
  text: Type.Optional(Type.String()),
});

export type ParsedNodeData = Static<typeof parsedNodeData>;

export const parsedNodeProperties = Type.Object({
  name: Type.Optional(Type.String()),
  id: Type.Optional(Type.String()),
  class: Type.Optional(Type.String()),
});

export const parsedNode = Type.Object({
  meta: Type.Any(),
  chain: Type.Array(parsedNodeProperties),
  data: Type.Array(parsedNodeData),
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


// output after all mutations have been applied
export const restructuredNode = Type.Object({
  name: tagName,
  href: Type.Optional(Type.String()),
  text: Type.Optional(Type.String()),
  children: Type.Optional(Type.Array(Type.Any())),
});

export interface RestructuredNode extends Static<typeof restructuredNode> {
  children?: RestructuredNode[];
}

export const restructuredDocument = Type.Object({
  hash: Type.String(),
  url: Type.String(),
  body: restructuredNode,
});

export type RestructuredDocument = Static<typeof restructuredDocument>;

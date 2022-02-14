import { Type } from "@sinclair/typebox";
import { tagName } from "./tags";

export const parsedNode = Type.Object({
  name: Type.Optional(Type.String()),
  id: Type.Optional(Type.String()),
  class: Type.Optional(Type.String()),
  href: Type.Optional(Type.String()),
  text: Type.Optional(Type.String()),
  children: Type.Optional(Type.Array(Type.Any())),
});

export const scrapeResult = Type.Object({
  url: Type.String(),
  hash: Type.String(),
  body: parsedNode,
});

export const scrapeRequest = Type.Object({
  url: Type.String(),
  sourceConfigId: Type.String(),
});

// output after all mutations have been applied (limited checking because schema would get too complex)
export const restructuredNode = Type.Object({
  name: tagName,
  children: Type.Optional(Type.Array(Type.Any())),
});

export const restructuredDocument = Type.Object({
  hash: Type.String(),
  url: Type.String(),
  body: restructuredNode,
});

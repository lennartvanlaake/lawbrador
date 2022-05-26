import { Type } from "@sinclair/typebox";
import { tagName } from "./tags";

export const parsedNode = Type.Object({
  tags: Type.Array(Type.String()),
  ids: Type.Array(Type.String()),
  classes: Type.Array(Type.String()),
  childIndex: Type.Number(),
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

export const documentReference = Type.Object({
  name: Type.Union([Type.String(), Type.Null()]),
  hash: Type.String(),
  url: Type.String(),
  sourceConfigId: Type.String()
})

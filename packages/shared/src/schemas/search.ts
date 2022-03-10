import { Type } from "@sinclair/typebox";

export const searchResult = Type.Object({
  text: Type.String(),
  href: Type.String(),
  hash: Type.String(),
});

export const searchResponse = Type.Object({
  results: Type.Array(searchResult),
});

export const searchRequest = Type.Object({
  sourceConfigId: Type.String(),
  searchParams: Type.Record(Type.String(), Type.String()),
});

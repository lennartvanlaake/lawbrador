import type { TSchema } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export const NullOptional = <T extends TSchema>(type: T) =>
  Type.Optional(Type.Union([type, Type.Null()]));

export const identity = Type.Object({
  _id: Type.String(),
});

export const identityParams = Type.Object({
  id: Type.String(),
});

export const hashed = Type.Object({
  hash: Type.String(),
});

export const errorResponse = Type.Object({
  message: Type.String(),
});

export const keyValue = Type.Object({
  key: Type.String(),
  value: Type.String(),
});


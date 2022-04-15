import type { TSchema} from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

export const NullOptionable = <T extends TSchema>(type: T) =>
  Type.Optional(Type.Union([type, Type.Null()]));

export const identity = Type.Object({
  _id: Type.String(),
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

export const marking = Type.Object({
  markedText: Type.String(),
  occuranceIndex: Type.Number(),
  comment: Type.Optional(Type.String()),
});

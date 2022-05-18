
import { Type } from "@sinclair/typebox";

export const marking = Type.Object({
    start: Type.Number(),
    end: Type.Number(),
    id: Type.String()
  })

export const startAndEndPosition = Type.Object({
  start: Type.Number(),
  end: Type.Number(),
})

import { Type } from "@sinclair/typebox";
import { documentReference } from "./scrape";

export const marking = Type.Object({
    start: Type.Number(),
    end: Type.Number(),
    _id: Type.String(),
    documentReference: documentReference
  })

export const startAndEndPosition = Type.Object({
  start: Type.Number(),
  end: Type.Number(),
})
export const annotation = Type.Object({
  _id: Type.String(),
  name: Type.String(),
  markings: Type.Array(marking)
})
export const unsavedAnnotation = Type.Omit(annotation, ["_id"])
import { Type } from "@sinclair/typebox";
import { documentReference } from "./scrape";

export const getMultipleRequest = Type.Object({
    references: Type.Array(documentReference)
})
import type { identity, hashed, errorResponse } from "./generic";
import type { Static } from "@sinclair/typebox";
import type { ObjectId } from "mongodb";

export type Hashed = Static<typeof hashed>;
export type ErrorResponse = Static<typeof errorResponse>;
export type Identity = Static<typeof identity>;
export interface MongoIdentity {
  _id: ObjectId;
}
export interface LawbradorEvent<T> {
  type: string;
  data: T;
}

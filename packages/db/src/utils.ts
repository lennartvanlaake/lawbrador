import type { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import { DB_NAME } from "./constants";

export function id() {
  return new ObjectId().toString();
}

export async function clean(client: MongoClient) {
  await client.db(DB_NAME).dropDatabase();
}

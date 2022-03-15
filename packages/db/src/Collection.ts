import type {
  Collection,
  MongoClient,
  Document,
  ClientSession} from "mongodb";
import {
  ObjectId
} from "mongodb";
import type { Identity, MongoIdentity } from "@lawbrador/shared";
import { DB_NAME } from "./constants";

function objectIdToString<T extends MongoIdentity>(obj: T): T & Identity {
  return { ...obj, _id: obj._id.toString() };
}

function stringToObjectId<T>(obj: T | (T & Identity)): T | (T & MongoIdentity) {
  if ("_id" in obj) {
    return { ...obj, _id: new ObjectId(obj._id) };
  }
  return obj;
}

export default class TypedCollection<T> {
  constructor(name: string) {
    this.name = name;
  }
  connect(client: MongoClient) {
    this.raw = client.db(DB_NAME).collection(this.name);
  }
  name: string;
  raw: Collection | null = null;
  checkConnected() {
    if (!this.raw) {
      throw new Error("Cannot use TypedCollection before it is connected");
    }
  }
  async findOne(query: Document): Promise<T | null> {
    this.checkConnected();
    const result = (await this.raw!.findOne(query)) as T & MongoIdentity;
    if (result) {
      return objectIdToString(result);
    }
    return result;
  }
  async get(id: string): Promise<T | null> {
    return await this.findOne({ _id: new ObjectId(id) });
  }
  async getOrThrow(id: string): Promise<T> {
    const result = await this.findOne({ _id: new ObjectId(id) });
    if (!result) {
      throw Error(`query result for id ${id} was null`);
    }
    return result;
  }
  async find(query: Document): Promise<T[]> {
    this.checkConnected();
    const result = (await this.raw!.find(query).toArray()) as Array<
      T & MongoIdentity
    >;
    return result.map((r) => objectIdToString(r));
  }
  async all(): Promise<T[]> {
    return await this.find({});
  }
  async insert(
    newObject: T,
    session: ClientSession | null = null
  ): Promise<string> {
    this.checkConnected();
    const options = session ? { session: session } : {};
    const result = await this.raw!.insertOne(
      stringToObjectId(newObject),
      options
    );
    return result.insertedId.toString();
  }
  async replace(input: T & Identity, session: ClientSession | null = null) {
    this.checkConnected();
    const toReplace = stringToObjectId<T>(input) as T & MongoIdentity;
    const options = session ? { session: session } : {};
    await this.raw!.replaceOne({ _id: toReplace._id }, toReplace, options);
  }
}

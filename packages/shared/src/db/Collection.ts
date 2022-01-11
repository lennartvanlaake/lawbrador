import {Collection, MongoClient, ObjectId, Document, ClientSession, InsertOneResult} from "mongodb";
import { DB_NAME }  from './types';
import type { MongoIdentity, Identity } from '../schemas/generic';

function objectIdToString<T extends MongoIdentity>(obj: T): T & Identity {
	obj._id = (obj._id as ObjectId).toString();
	return obj as T & Identity;
}

function stringToObjectId<T extends MongoIdentity>(obj: T): T & MongoIdentity {
	obj._id = new ObjectId((obj._id as string));
	return obj as T & MongoIdentity;
}

export class TypedCollection<T> {	
	constructor(name: string) {
		this.name = name;
	}
	async connect(client: MongoClient) {
		this.raw = (await client.connect()).db(DB_NAME).collection(this.name);
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
		const result = await this.raw!!.findOne(query) as T & MongoIdentity;
		if (result) {
			return objectIdToString(result);
		}
		return result;
	}
	async get(id: string): Promise<T | null> {
		debugger;
		return await this.findOne({ _id: new ObjectId(id) });
	}
	async find(query: Document): Promise<T[]> {
		this.checkConnected();
		const result = await this.raw!!.find(query).toArray() as Array<T & MongoIdentity>;
		return result.map(r => objectIdToString(r));
	}
	async all(): Promise<T[]> {
		return await(this.find({}));
	}
	async insert(newObject: T & MongoIdentity, session: ClientSession | null = null): Promise<String> {
		this.checkConnected();
		let result: InsertOneResult;
		if (session) {
			result = await this.raw!!.insertOne(stringToObjectId(newObject) as Document, { session: session});
		} else {
			result = await this.raw!!.insertOne(stringToObjectId(newObject) as Document) 
		}
		return result.insertedId.toString();
	}
	async update(toUpdate: T & MongoIdentity, session: ClientSession) {
		this.checkConnected();
		toUpdate = stringToObjectId(toUpdate);
		await this.raw!!.updateOne({ _id: toUpdate._id }, toUpdate as Document, { session: session });
	}

}

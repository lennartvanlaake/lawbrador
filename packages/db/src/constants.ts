import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path'

dotenv.config({ path: path.join('../..','.env') });
export const DB_NAME = "lawbrador";
export const CONNECTION_STRING = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}?replicaSet=${process.env.MONGODB_REPLICA_SET_KEY}`;
console.log(CONNECTION_STRING);
export const LAWBRADOR_CLIENT = new MongoClient(CONNECTION_STRING);

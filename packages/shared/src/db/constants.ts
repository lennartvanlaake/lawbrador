import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path'

dotenv.config({ path: path.join('../..','.env') });
export const DB_NAME = "lawbrador";
export const CONNECTION_STRING = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
export const LAWBRADOR_CLIENT = new MongoClient(CONNECTION_STRING);

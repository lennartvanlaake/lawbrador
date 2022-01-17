import { MongoClient } from 'mongodb';

export const DB_NAME = "lawbrador";
export const CONNECTION_STRING = "mongodb://localhost:27017?replicaSet=rs0&readPreference=primary&ssl=false";
export const LAWBRADOR_CLIENT = new MongoClient(CONNECTION_STRING);

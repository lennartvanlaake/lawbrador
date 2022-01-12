import { MongoClient } from 'mongodb';

export const DB_NAME = "lawbrador";
export const LAWBRADOR_CLIENT = new MongoClient("mongodb://localhost:27017?replicaSet=rs0&readPreference=primary&ssl=false");

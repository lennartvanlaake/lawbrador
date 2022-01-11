import { ObjectId } from 'mongodb';

export function id() {
	return new ObjectId().toString();
}

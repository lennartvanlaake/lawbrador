import {Identity} from "..";

export function last(array: any[]) {
	return array[array.length - 1];
}

export function toIdentity(id: string): Identity {
	return { _id: id }
}


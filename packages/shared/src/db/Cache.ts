import TypedCollection from './Collection';
import type { Document } from 'mongodb';
export default class TypedCache<T> extends TypedCollection<T> {

	async cachedOrCreated(filter: Document, noHitFunction: () => Promise<T> ): Promise<T> {
		let result = await this.findOne(filter);
		if (!result) {
			result = await noHitFunction();
			await this.insert({ ...result })
		} 
		return result;
	}

}

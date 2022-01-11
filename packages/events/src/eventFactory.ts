
import { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules'
import type { LawbradorEvent } from '@lawbrador/shared/src/schemas/generic'

export interface SourceConfigUpdated {
	sourceConfig: SourceSiteConfig; 
}
export interface SourceConfigCreated {
	sourceConfig: SourceSiteConfig; 
}

export default class EventFactory {
	static SourceConfigUpdated(data: SourceConfigUpdated): LawbradorEvent<SourceConfigUpdated> {
		return {
			type: 'SourceConfigUpdated',
			data: data,
		};
	}
	static SourceConfigCreated(data: SourceConfigCreated): LawbradorEvent<SourceConfigCreated> {
		return {
			type: 'SourceConfigCreated',
			data: data,
		};
	}
}

import type { LawbradorEvent, SourceSiteConfig } from '@lawbrador/shared';

export interface SourceConfigUpdated {
	sourceConfig: SourceSiteConfig;
}
export const SOURCE_CONFIG_UPDATED = 'SourceConfigUpdated';

export interface SourceConfigCreated {
	sourceConfig: SourceSiteConfig;
}
export const SOURCE_CONFIG_CREATED = 'SourceConfigCreated';

export default class EventFactory {
	static SourceConfigUpdated(data: SourceConfigUpdated): LawbradorEvent<SourceConfigUpdated> {
		return {
			type: SOURCE_CONFIG_UPDATED,
			data: data
		};
	}
	static SourceConfigCreated(data: SourceConfigCreated): LawbradorEvent<SourceConfigCreated> {
		return {
			type: SOURCE_CONFIG_CREATED,
			data: data
		};
	}
}

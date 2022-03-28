import type { SourceSiteConfig, SearchResult, SearchParams } from '@lawbrador/shared';

interface QueryAndPage {
	query: string;
	page?: string;
}

export interface IndexProps {
	sourceConfigs: SourceSiteConfig[];
	query: URLSearchParams;
	searchParams: SearchParams;
	sourceConfig: SourceSiteConfig;
	searchResults: SearchResult[];
}

export interface SourceConfigEditorProps {
	sourceConfigs: SourceSiteConfig[];
	sourceConfig: Omit<SourceSiteConfig, '_id'> | SourceSiteConfig | null;
}

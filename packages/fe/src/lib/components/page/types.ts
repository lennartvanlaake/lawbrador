import type { SourceSiteConfig, SearchResult } from '@lawbrador/shared';

export interface IndexProps {
	sourceConfigs: SourceSiteConfig[];
	query: URLSearchParams;
	searchParams: Record<string, string>;
	sourceConfig: SourceSiteConfig;
	searchResults: SearchResult[];
}

export interface SourceConfigEditorProps {
	sourceConfigs: SourceSiteConfig[];
	sourceConfig: Omit<SourceSiteConfig, '_id'> | SourceSiteConfig | null;
}

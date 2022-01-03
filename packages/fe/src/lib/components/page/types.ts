import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
import type { SearchResult } from '@lawbrador/shared/src/schemas/search';

export interface IndexProps {
	sourceConfigs: SourceSiteConfig[];
	query: URLSearchParams;
	searchParams: Record<string, string>;
	sourceConfig: SourceSiteConfig;
	searchResults: SearchResult[];
}

export interface SourceConfigEditorProps {
	sourceConfigs: SourceSiteConfig[];
	sourceConfig: SourceSiteConfig | undefined;
}

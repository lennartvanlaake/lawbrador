import { SourceSiteConfig } from 'packages/shared/schemas/rules';
import { scrape } from './scraper';
import { getFirstMatching } from './matcher';

function applyVariables(url: string, variables: any): string {
	for (const prop in variables) {
		url = url.replace(prop, variables[prop]);
	}
	return url;
}

export async function search(
	config: SourceSiteConfig,
	searchInput: any,
): Promise<any> {
	const url = applyVariables(config.baseUrl, searchInput);
	const result = await scrape(url);
	return result;
}

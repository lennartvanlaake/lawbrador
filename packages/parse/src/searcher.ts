import { SourceSiteConfig } from 'packages/shared/schemas/rules';
import { scrape } from './scraper';
import { getFirstMatching, getAllMatching } from './matcher';

function applyVariables(url: string, variables: any): string {
	for (const prop in variables) {
		url = url.replace(prop, variables[prop]);
	}
	console.log(variables + 'x');
	return url;
}

export async function search(
	config: SourceSiteConfig,
	searchInput: any,
): Promise<any> {
	const renderedPath = applyVariables(
		config.htmlSearchRuleSet.pathWithVariables,
		searchInput,
	);
	const scrapeResult = await scrape(`${config.baseUrl}${renderedPath}`);
	const base = getFirstMatching(
		scrapeResult,
		config.htmlSearchRuleSet.resultBodyRule,
	);
	const searchResult = getAllMatching(
		base,
		config.htmlSearchRuleSet.resultRule,
	);
	return searchResult;
}

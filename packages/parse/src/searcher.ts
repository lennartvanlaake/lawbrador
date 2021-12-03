import { SourceSiteConfig } from 'packages/shared/schemas/rules';
import { getFirstMatching, getAllMatching } from './matcher';
import axios from 'axios';

function applyVariables(url: string, variables: any): string {
	for (const prop in variables) {
		url = url.replace(prop, variables[prop]);
	}
	return url;
}

function getUrl(config: SourceSiteConfig, variables: any): string {
	const renderedPath = applyVariables(
		config.htmlSearchRuleSet.pathWithVariables,
		variables,
	);
	return config.baseUrl + renderedPath;
}

export async function search(
	config: SourceSiteConfig,
	searchInput: any,
): Promise<any> {
	const request = {
		url: getUrl(config, searchInput),
		refresh: true,
	};
	const scrapeResult = await axios.post(
		'http://localhost:8080/api/scrape',
		request,
	);
	const bodyNode = scrapeResult.data.bodyNode;
	const base = getFirstMatching(
		bodyNode,
		config.htmlSearchRuleSet.resultListRule,
	);
	const searchResult = getAllMatching(
		base,
		config.htmlSearchRuleSet.resultRule,
	);
	const links = searchResult
		.map((el) =>
			getFirstMatching(
				el,
				config.htmlSearchRuleSet.resultLinkRule,
			),
		)
		.filter((el) => el.data && el.data?.length > 0)
		.map((el) => {
			return {
				text: el.data[0].text,
				link: el.data[0].href,
			};
		});
	return links;
}

import { Errors, SearchResult, SourceSiteConfig } from '@lawbrador/shared';
import { search } from './api';
import { incrementPageNumber } from '@lawbrador/shared';

export function getInputFromSearchParams(
	query: URLSearchParams,
	sourceConfig: SourceSiteConfig
): Record<string, string> | null {
	let searchParams = {};
	if (sourceConfig && query?.get(sourceConfig.htmlSearchRuleSet.queryVariable)) {
		query.forEach((value, key) => {
			searchParams[key] = value;
		});
		return searchParams;
	}
	return null;
}

export async function getNextPage(
	firstSearchResultLength: number,
	searchParams: Record<string, string>,
	oldResults: SearchResult[],
	sourceConfig: SourceSiteConfig
) {
	try {
		searchParams = incrementPageNumber(searchParams, sourceConfig.htmlSearchRuleSet);
		const newResults = (
			await search({
				sourceConfigId: sourceConfig._id,
				searchParams: searchParams
			})
		).results;
		// some results are the same: this is the last page and filter duplicates
		const newResultsHashes = newResults.map((r) => r.hash);
		const oldResultsHashes = oldResults.map((r) => r.hash);
		if (newResultsHashes.some((r) => oldResultsHashes.includes(r))) {
			return {
				isLast: true,
				searchParams: searchParams,
				searchResults: oldResults.concat(
					newResults.filter((it) => !oldResultsHashes.includes(it.hash))
				)
			};
		}
		//got less results than the first time: this is the last page
		if (newResults.length < firstSearchResultLength) {
			return {
				isLast: false,
				searchParams: searchParams,
				searchResults: oldResults.concat(newResults)
			};
		}
		return {
			isLast: false,
			searchParams: searchParams,
			searchResults: oldResults.concat(newResults)
		};
	} catch (e) {
		console.error(e);
		return {
			isLast: true,
			searchParams: searchParams,
			searchResults: oldResults
		};
	}
}

export async function submitQuery(
	searchParams: Record<string, string>,
	sourceConfig: SourceSiteConfig
): Promise<SearchResult[]> {
	searchParams[sourceConfig.htmlSearchRuleSet.pageVariable] = '1';
	let searchResults = (
		await search({ sourceConfigId: sourceConfig._id!!, searchParams: searchParams })
	).results;
	addToHistory(searchParams, sourceConfig);
	if (searchResults.length == 0) {
		throw Error(Errors.NO_RESULTS);
	}
	return searchResults;
}

function addToHistory(searchParams: Record<string, string>, sourceConfig: SourceSiteConfig) {
	let url = `?sourceConfigId=${sourceConfig._id!!}`;
	sourceConfig.searchUrlConfig.queryComponents.forEach((queryParam) => {
		const component = queryParam.urlComponent;
		if ('variableName' in component) {
			const paramValue = searchParams[component.variableName];
			if (component.variableName != sourceConfig.htmlSearchRuleSet.pageVariable && paramValue) {
				url = url + `&${component.variableName}=${paramValue}`;
			}
		}
	});
	window.history.pushState({}, 'Home', url);
}

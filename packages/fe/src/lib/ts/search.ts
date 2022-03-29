import type { SearchParams, SearchResult, SourceSiteConfig } from '@lawbrador/shared';
import { Errors } from '@lawbrador/shared';
import { search } from './api';
import { incrementPageNumber } from '@lawbrador/shared';
import { PAGE_VARIABLE_NAME, QUERY_VARIABLE_NAME } from '@lawbrador/shared/src/constants/other';
import { browser } from '$app/env';

export function getInputFromSearchParams(query: URLSearchParams): SearchParams | null {
	const queryValue = query.get(QUERY_VARIABLE_NAME);
	if (!queryValue) {
		return null;
	}
	const searchParams: SearchParams = {
		query: queryValue
	};
	query.forEach((value, key) => {
		searchParams[key] = value;
	});
	return searchParams;
}

export async function getNextPage(
	firstSearchResultLength: number,
	searchParams: SearchParams,
	oldResults: SearchResult[],
	sourceConfig: SourceSiteConfig
) {
	try {
		searchParams = incrementPageNumber(searchParams);
		const newResults = (
			await search({
				sourceConfigId: sourceConfig._id,
				searchParams: searchParams
			})
		).results;

		if (newResults.length == 0) {
			return {
				isLast: true,
				searchParams: searchParams,
				searchResults: oldResults
			};
		}

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
	searchParams: SearchParams,
	sourceConfig: SourceSiteConfig
): Promise<SearchResult[]> {
	searchParams[PAGE_VARIABLE_NAME] = '1';
	try {
		const searchResults = (
			await search({ sourceConfigId: sourceConfig._id!, searchParams: searchParams })
		).results;
		if (browser) {
			addToHistory(searchParams, sourceConfig);
		}
		if (searchResults.length == 0) {
			throw Error(Errors.NO_RESULTS);
		}
		return searchResults;
	} catch (e) {
		if (browser) {
			alert(e.message);
		}
	}
	return [];
}

function addToHistory(searchParams: SearchParams, sourceConfig: SourceSiteConfig) {
	let url = `?sourceConfigId=${sourceConfig._id!}`;
	url += `&${QUERY_VARIABLE_NAME}=${searchParams[QUERY_VARIABLE_NAME]}`;
	sourceConfig.searchUrlConfig.queryComponents.forEach((queryParam) => {
		const component = queryParam.urlComponent;
		if ('variableName' in component) {
			const paramValue = searchParams[component.variableName];
			if (paramValue) {
				url += `&${component.variableName}=${paramValue}`;
			}
		}
	});
	window.history.pushState({}, 'Home', url);
}

import type { SearchResult, SourceSiteConfig } from '@lawbrador/shared';
import {search} from './api';
import { incrementPageNumber } from '@lawbrador/shared';

export function getInputFromSearchParams(query: URLSearchParams, sourceConfig: SourceSiteConfig): Record<string, string> | null {
	let searchParams = {};
	if (sourceConfig && query?.get(sourceConfig.htmlSearchRuleSet.queryVariable)) {
		query.forEach((value, key) => {
			searchParams[key] = value;
		});
		return searchParams;
	}
	return null;
}

export async function getNextPage(firstSearchResultLength: number, searchParams: Record<string, string>, oldResults: SearchResult[], sourceConfig: SourceSiteConfig) {
	try {
	   	searchParams = incrementPageNumber(searchParams, sourceConfig.htmlSearchRuleSet);
		const newResults = (await search({
			sourceConfigId: sourceConfig._id,
			searchParams: searchParams
		})).results;
		return {
			isLast: isLastPage(firstSearchResultLength, newResults, oldResults),
			searchParams: searchParams,
			searchResults: oldResults.concat(newResults) 
		}
	} catch (e) {
		console.error(e);
		return {
			isLast: true, 
			searchParams: searchParams,
			searchResults: oldResults 
		}
	}
}

function isLastPage(firstSearchResultLength: number, newResults: SearchResult[], oldResults: SearchResult[]): boolean {
	//got less results than the first time
	if (newResults.length < firstSearchResultLength) {
		return true;	
	}
	// all the results are the same
	//@ts-ignore
	const nextPageHashes = newResults.map((r) => r.hash);
	const searchResultHashes = oldResults.map((r) => r.hash); 
	if (nextPageHashes.every((r) => searchResultHashes.includes(r))) {
		return true;
	}
	return false;

}

export async function submitQuery(searchParams: Record<string, string>, sourceConfig: SourceSiteConfig): Promise<SearchResult[]> {
	searchParams[sourceConfig.htmlSearchRuleSet.pageVariable] = '1';
	try {
		let searchResults = (
			await search({ sourceConfigId: sourceConfig._id!!, searchParams: searchParams })
		).results;
		if (searchResults.length == 0) {
			throw Error("");
		}
		addToHistory(searchParams, sourceConfig);
		return searchResults;
	} catch (e) {
		console.error(e);
		throw Error("");
	}
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

import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
import type {
	ScrapeResult,
	ScrapeRequest
} from '@lawbrador/shared/src/schemas/scrape';
import type { SearchRequest, SearchResult } from '@lawbrador/shared/src/schemas/search';
import type { Identity } from '@lawbrador/shared/src/schemas/generic';
import * as Endpoints from '@lawbrador/shared/src/endpoints';

const baseUrl = 'http://localhost:8080';

async function get(path: string, fetchParam: any) {
	if (fetchParam) {
		return await (await fetchParam(`${baseUrl}/${path}`)).json();
	} else {
		return await (await fetch(`${baseUrl}/${path}`)).json();
	}
}

async function post(path: string, body: any) {
	const req = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	};
	return await (await fetch(`${baseUrl}/${path}`, req)).json();
}

async function put(path: string, body: any) {
	const req = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	};
	return await (await fetch(`${baseUrl}/${path}`, req)).json();
}

export async function getDocument(
	id: string,
	fetchParam: any = false
): Promise<ScrapeResult> {
	throw new Error("not implemented");
	//return await get(`scrape/${id}`, fetchParam);
}

export async function getSourceConfigs(fetchParam: any = false): Promise<SourceSiteConfig[]> {
	return await get(Endpoints.SOURCES_ENDPOINT, fetchParam);
}

export async function newSourceConfig(newConfig: Omit<SourceSiteConfig, '_id'>): Promise<Identity> {
	return await post(Endpoints.SOURCES_ENDPOINT, newConfig);
}

export async function updateSourceConfig(config: SourceSiteConfig): Promise<Identity> {
	return await put(Endpoints.SOURCES_ENDPOINT, config);
}

export async function scrape(request: ScrapeRequest, fetchParam: any = false): Promise<Identity> {
	throw new Error("not implemented");
	//return await post('scrape', request, fetchParam);
}

export async function search(
	body: SearchRequest,
): Promise<SearchResult[]> {
	return await post(Endpoints.SEARCH_ENDPOINT, body);
}

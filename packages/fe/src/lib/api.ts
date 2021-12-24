import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
import type {
	RestructuredDocument,
	ScrapeRequest
} from '@lawbrador/shared/src/schemas/document_version';
import type { SearchRequest, SearchResult } from '@lawbrador/shared/src/schemas/search';
import type { Identity } from '@lawbrador/shared/src/schemas/generic';

const baseUrl = 'http://localhost:8080/api';

async function get(path: string, fetchParam: any) {
	if (fetchParam) {
		return await (await fetchParam(`${baseUrl}/${path}`)).json();
	} else {
		return await (await fetch(`${baseUrl}/${path}`)).json();
	}
}

async function post(path: string, body: any, fetchParam: any) {
	const req = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	};
	if (fetchParam) {
		return await (await fetchParam(`${baseUrl}/${path}`, req)).json();
	} else {
		return await (await fetch(`${baseUrl}/${path}`, req)).json();
	}
}
export async function getDocument(
	id: string,
	fetchParam: any = false
): Promise<RestructuredDocument> {
	return await get(`scrape/${id}`, fetchParam);
}

export async function getSourceConfigs(fetchParam: any = false): Promise<SourceSiteConfig[]> {
	return await get('sources', fetchParam);
}

export async function scrape(request: ScrapeRequest, fetchParam: any = false): Promise<Identity> {
	return await post('scrape', request, fetchParam);
}

export async function search(
	body: SearchRequest,
	fetchParam: any = false
): Promise<SearchResult[]> {
	return await post('search', body, fetchParam);
}

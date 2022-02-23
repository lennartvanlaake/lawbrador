import type {
	SearchRequest,
	Identity,
	SourceSiteConfig,
	SearchResponse,
	ScrapeResult,
	ErrorResponse
} from '@lawbrador/shared';
import { Endpoints } from '@lawbrador/shared';

// baseUrl should only be set in development, default to root when running on a server
const baseUrl = import.meta.env.VITE_URL ?? '';

async function get(path: string, fetchParam: any) {
	if (fetchParam) {
		return await (await fetchParam(`${baseUrl}${path}`)).json();
	} else {
		return await (await fetch(`${baseUrl}${path}`)).json();
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
	return await (await fetch(`${baseUrl}${path}`, req)).json();
}

async function put(path: string, body: any) {
	const req = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	};
	return await (await fetch(`${baseUrl}${path}`, req)).json();
}

export async function getDocument(
	url: string,
	sourceConfigId: string,
	fetchParam: any = false
): Promise<ScrapeResult> {
	const result: ScrapeResult | ErrorResponse = await get(
		`${Endpoints.GET_OR_SCRAPE_DOCUMENT}?url=${encodeURIComponent(
			url
		)}&sourceConfigId=${sourceConfigId}`,
		fetchParam
	);
	if ('message' in result) {
		throw new Error(result.message);
	} else {
		return result;
	}
}

export async function getSourceConfigs(fetchParam: any = false): Promise<SourceSiteConfig[]> {
	return await get(Endpoints.SOURCES, fetchParam);
}

export async function newSourceConfig(newConfig: Omit<SourceSiteConfig, '_id'>): Promise<Identity> {
	return await post(Endpoints.SOURCES, newConfig);
}

export async function updateSourceConfig(config: SourceSiteConfig): Promise<Identity> {
	return await put(Endpoints.SOURCES, config);
}

export async function search(body: SearchRequest): Promise<SearchResponse> {
	return await post(Endpoints.SEARCH, body);
}

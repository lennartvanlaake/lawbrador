import { browser } from '$app/env';
import type {
	SearchRequest,
	Identity,
	SourceSiteConfig,
	SearchResponse,
	ScrapeResult,
	ErrorResponse,
	LoginResponse,
	LoginRequest
} from '@lawbrador/shared';
import { Endpoints } from '@lawbrador/shared';
import type { Method } from 'axios';

// baseUrl should only be set in development, default to root when running on a server
const baseUrl = import.meta.env.VITE_URL ?? '';

async function get(path: string, fetchParam: any) {
	let result: Response;
	if (fetchParam) {
		result = await fetchParam(`${baseUrl}${path}`);
	} else {
		result = await fetch(`${baseUrl}${path}`);
	}
	if (!result.ok) {
		throw new Error(await result.text());
	}
	return await result.json();
}

async function request(path: string, body: any, method: Method) {
	const headers: HeadersInit = browser
		? {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('jwt') ?? ''
		  }
		: { 'Content-Type': 'application/json' };
	const req = {
		method: method,
		headers: headers,
		body: JSON.stringify(body)
	};
	const result = await fetch(`${baseUrl}${path}`, req);
	if (!result.ok) {
		throw new Error(await result.text());
	}
	return await result.json();
}

async function post(path: string, body: any) {
	return await request(path, body, 'POST');
}

async function put(path: string, body: any) {
	return await request(path, body, 'PUT');
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

export async function exchangePasswordForJwt(body: LoginRequest): Promise<LoginResponse> {
	return await post(Endpoints.LOGIN, body);
}

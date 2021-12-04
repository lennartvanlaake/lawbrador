import type { SourceSiteConfig } from '@legalthingy/shared/schemas/rules';

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
export async function getDocuments(fetchParam: any = false): Promise<any> {
	const result = await get('scrape', fetchParam);
	return result;
}
export async function getDocument(id: string, fetchParam: any = false): Promise<any> {
	return await get(`scrape/${id}`, fetchParam);
}

export async function getSourceConfigs(fetchParam: any = false): Promise<SourceSiteConfig> {
	return await get('sources', fetchParam);
}

export async function scrape(url: string, fetchParam: any = false): Promise<any> {
	return await post('scrape', { url: url }, fetchParam);
}

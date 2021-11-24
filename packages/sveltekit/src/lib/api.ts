import type {} from '@sveltejs/kit';

const baseUrl = 'http://localhost:8080/api';

async function get(path: string, fetchParam: any) {
	if (fetchParam) {
		return await (await fetchParam(`${baseUrl}/${path}`)).json();
	} else {
		return await (await fetch(`${baseUrl}/${path}`)).json();
	}
}

export async function getDocuments(fetchParam: any = false): Promise<any> {
	const result = await get('document', fetchParam);
	return result;
}
export async function getDocument(id: string, fetchParam: any = false): Promise<any> {
	return await get(`document/${id}`, fetchParam);
}

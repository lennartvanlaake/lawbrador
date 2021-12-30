const baseUrl = 'http://localhost:8080/api';
async function get(path, fetchParam) {
	if (fetchParam) {
		return await (await fetchParam(`${baseUrl}/${path}`)).json();
	} else {
		return await (await fetch(`${baseUrl}/${path}`)).json();
	}
}
async function post(path, body, fetchParam) {
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
export async function getDocument(id, fetchParam = false) {
	return await get(`scrape/${id}`, fetchParam);
}
export async function getSourceConfigs(fetchParam = false) {
	return await get('sources', fetchParam);
}
export async function scrape(request, fetchParam = false) {
	return await post('scrape', request, fetchParam);
}
export async function search(body, fetchParam = false) {
	return await post('search', body, fetchParam);
}
//# sourceMappingURL=api.js.map

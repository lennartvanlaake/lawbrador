
import type { Document } from '@legalthingy/shared/schemas/text'
	import type {  } from '@sveltejs/kit'

const baseUrl = "http://localhost:8080/api" 

async function get(path: string, fetchParam: any) {
	if (fetchParam) {
		return await(await fetchParam(`${baseUrl}/${path}`)).json() 
	} else {
		return await(await fetch(`${baseUrl}/${path}`)).json() 
	}
}

export async function getDocuments(fetchParam: any = false): Promise<[Document]> { return  await get("text", fetchParam) };

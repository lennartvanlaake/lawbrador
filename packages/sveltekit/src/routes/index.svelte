

<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { getDocuments } from "$lib/api";
	export const load: Load = async ({ fetch }) => {
		const res = await getDocuments(fetch);
		return { 
			props: {
				documents: res,
			}
		};
	}
</script>


<script lang="ts">
	import axios from 'axios';
	import type { Document } from '@legalthingy/parse/src/document_factory';
	import DocumentView from '$lib/DocumentView.svelte';
	export let documents: any[];
	$: console.log(documents);
	let url = '';
	let scrapeResult: Document;
	async function preview() {
		const scrapeRequest = { url: url };
		const result = await axios.post('/api/scrape', scrapeRequest);
		console.log(result);
		scrapeResult = result.data;
	}
	async function submit() {
		const result = await axios.post('/api/document', scrapeResult);
		documents = await getDocuments(); 
		console.log(result);
	}
</script>

<h1>Current documents</h1>
{ #each documents as doc }
	<p><a href="/document/{doc._id}">{doc._id}</a></p>
{/each }

<h1>Insert url here!</h1>
<textarea id="text-field" bind:value={url} />
<button on:click={preview}>preview</button>
<button on:click={submit}>submit</button>
{#if scrapeResult}
	<DocumentView document={scrapeResult}></DocumentView>
{/if}

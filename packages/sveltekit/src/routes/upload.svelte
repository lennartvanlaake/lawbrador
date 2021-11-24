<script lang="ts">
	import axios from 'axios';
	import { marked } from 'marked';
	import type { Document } from '@legalthingy/parse/src/document_factory';
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
		console.log(result);
	}
</script>

<h1>Insert url here!</h1>
<textarea id="text-field" bind:value={url} />
<button on:click={preview}>preview</button>
<button on:click={submit}>submit</button>
{#if scrapeResult}
	{#each scrapeResult.paragraphs as res}
		{#if res.type == 'paragraph'}
			{#if res.pre}
				<p><span>{res.pre}</span>{@html marked(res.text)}</p>
			{:else}
				<p>{@html marked(res.text)}</p>
			{/if}
		{:else}
			<h2>{@html marked(res.text)}</h2>
		{/if}
	{/each}
{/if}

<style>
	p:before {
		content: attr(data-pre);
		display: inline-block;
	}
</style>

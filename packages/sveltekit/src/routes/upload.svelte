<script lang="ts">
	import axios from 'axios';
	import { marked } from 'marked';
	let url = '';
	let scrapeResult: any[] = [];
	async function submit() {
		const scrapeRequest  = { url: url };
		const result = await axios.post('/api/scrape', scrapeRequest);
		console.log(result);
		scrapeResult = result.data;
	}
</script>

<h1>Insert url here!</h1>
<textarea id="text-field" bind:value={url} />
<button id="text-button" on:click={submit}>submit</button>
{#each scrapeResult as res}
	{#if res.type == "paragraph" }
		<p>{ @html marked(res.text) }</p>	
	{:else }
		<h2>{ @html marked(res.text) }</h2>
	{/if}
{/each }

<script context="module" lang="ts">
	import type { SourceSiteConfig } from '@legalthingy/shared/schemas/rules';
	import type {  SearchResult } from '@legalthingy/shared/schemas/search';
	import type { Load } from "@sveltejs/kit";
	import { getSourceConfigs } from "$lib/api";
	export const load: Load = async ({ page, fetch }) => {
		const url = `http://localhost:8080/api/sources`;
		const sources  =  await getSourceConfigs(fetch);
		return { 
			props: {
				sourceConfigs: sources,
			}
		};
	}
</script>

<script lang="ts">
	import SearchResultComponent from '$lib/SearchResult.svelte';
	import { search } from '$lib/api';	
	import { setSourceConfig } from '$lib/store';
	import { scrape } from '$lib/api';

	export let sourceConfigs: SourceSiteConfig[] = []
	let sourceConfig: SourceSiteConfig;
	let searchTerm = "";
	let searchResults: SearchResult[] = [];	
	let selectedName;
	$: sourceConfig = sourceConfigs.filter((conf) => conf.name == selectedName)[0];
	async function submitQuery() {
		setSourceConfig(sourceConfig);
		console.log(sourceConfig);
		try {
			searchResults = await search({ sourceConfigId: sourceConfig.id, searchParams: { query: searchTerm } }); 
		} catch (e) {
			alert(`Search went boom: ${e.message}`)
		}
	}

	async function submitIfEnter(event: KeyboardEvent) {
		console.log(event);
		if (event.key == "Enter") {
			await submitQuery();
		}
	}
</script>

<h1>Search here</h1>
<input type="text" id="text-field" bind:value={searchTerm} />
<button on:click={submitQuery}>search</button>
<select bind:value="{selectedName}">
{#each sourceConfigs as config }
	<option value={config.name}>{config.name}</option>	
{/each }
</select>
{#each searchResults as result }
	<SearchResultComponent data={result} />
{/each }

<svelte:window on:keypress={submitIfEnter}/>


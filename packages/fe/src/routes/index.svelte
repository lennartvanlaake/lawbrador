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
  	import { browser } from '$app/env'; 

	export let sourceConfigs: SourceSiteConfig[] = []
	let sourceConfig: SourceSiteConfig;
	let searchTerm = "";
	let searchResults: SearchResult[] = [];	
	let selectedName;
	$: sourceConfig = sourceConfigs.filter((conf) => conf.name == selectedName)[0];
	async function submitQuery() {
		setSourceConfig(sourceConfig);
		console.log(sourceConfig);
		searchResults = await search({ sourceConfigId: sourceConfig.id, searchParams: { $search: searchTerm } }); 
	}
</script>

<h1>Search here</h1>
<textarea id="text-field" bind:value={searchTerm} />
<button on:click={submitQuery}>search</button>
<select bind:value="{selectedName}">
{#each sourceConfigs as config }
	<option value={config.name}>{config.name}</option>	
{/each }
</select>
{#each searchResults as result }
	<SearchResultComponent link={result.href} text={result.text} />
{/each }

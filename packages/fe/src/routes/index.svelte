<script context="module" lang="ts">
	import type { SourceSiteConfig } from '@legalthingy/shared/schemas/rules';
	import type {  SearchResult } from '@legalthingy/shared/schemas/search';
	import type { Load } from "@sveltejs/kit";
	import { getSourceConfigs } from "$lib/api";
	export const load: Load = async ({ page, fetch}) => {
		const sources  =  await getSourceConfigs(fetch);
		return { 
			props: {
				query: page.query,
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
	import { onMount, onDestroy } from 'svelte';

	export let sourceConfigs: SourceSiteConfig[];
	export let query: URLSearchParams;
	let searchTerm = query.get('query') ?? "";
	let searchResults: SearchResult[] = [];	
	let sourceConfigId = query.get('sourceConfigId') ?? sourceConfigs[0].id;
	$: sourceConfig = sourceConfigs.filter((conf) => conf.id == sourceConfigId)[0];
	async function submitQuery() {
		searchResults = [];
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
	
	onMount(() => {
		if (query.get("query")) {
			submitQuery()
		}
	});
	
	function addToHistory() {
		const url = `?sourceConfigId=${sourceConfigId}&query=${searchTerm}`;
		console.log(url);
		window.history.pushState({}, "Home", url)
	}

</script>

<h1>Search here</h1>
<input type="text" id="text-field" bind:value={searchTerm} />
<button on:click={submitQuery}>search</button>
<select bind:value="{sourceConfigId}">
{#each sourceConfigs as config }
	<option value={config.id}>{config.name}</option>	
{/each }
</select>
{#each searchResults as result }
	<SearchResultComponent data={result} on:searchResultClicked={addToHistory}/>
{/each }

<svelte:window on:keypress={submitIfEnter}/>


<script lang="ts">
	import { search } from '$lib/api';	
	import SearchOptions from './SearchOptions.svelte';
	import type { SourceSiteConfig } from '@legalthingy/shared/schemas/rules';
	import type {  SearchResult } from '@legalthingy/shared/schemas/search';
	export let sourceConfig: SourceSiteConfig;
	export let searchResults: SearchResult[] = [];
	export let searchParams: Record<string, string>;
	$: queryVariable = sourceConfig?.htmlSearchRuleSet.queryVariable;
	$: pageVariable = sourceConfig?.htmlSearchRuleSet.pageVariable;

	async function submitIfEnter(event: KeyboardEvent) {
		if (event.key == "Enter") {
			await submitQuery();
		}
	}
	async function submitQuery() {
		searchResults = [];
		searchParams[pageVariable] = '1';
		console.log(sourceConfig);
		try {
			searchResults = await search({ sourceConfigId: sourceConfig.id, searchParams: searchParams });
			if (searchResults.length == 0) {
				alert("search completed, no results");
			}
		} catch (e) {
			console.error(e);
			alert(`Search went boom: ${e.message}`)
		}
	}
</script>

<h1>Search here</h1>
<input type="text" id="text-field" bind:value={searchParams[queryVariable]} />
<SearchOptions bind:searchParams={searchParams} sourceConfig={sourceConfig} />
<button on:click={submitQuery}>search</button>
<svelte:window on:keypress={submitIfEnter}/>

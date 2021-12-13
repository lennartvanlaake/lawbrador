<script context="module" lang="ts">
		export const ssr = false;

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
	import InfiniteScroll from "svelte-infinite-scroll";

	import { search } from '$lib/api';	
	import { setSourceConfig } from '$lib/store';
	import { scrape } from '$lib/api';
	import { onMount } from 'svelte';
	import { incrementPageNumber } from '@legalthingy/parse/src/searcher';

	export let sourceConfigs: SourceSiteConfig[];
	export let query: URLSearchParams;
	
	let searchResults: SearchResult[] = [];	
	let sourceConfigId = query.get('sourceConfigId') ?? sourceConfigs[0].id;
	let sourceConfig = sourceConfigs.filter((conf) => conf.id == sourceConfigId)[0];
	$: sourceConfig = sourceConfigs.filter((conf) => conf.id == sourceConfigId)[0];
	const {queryVariable, pageVariable} = sourceConfig.htmlSearchRuleSet;
	let searchTerm = query.get(queryVariable) ?? "";
	let searchParams = {};
	$: searchParams[queryVariable] = searchTerm;

	let scrollThreshold: number = Number.MAX_VALUE;
	let isSearching = false;
	let firstSearchResultLength: number;
	async function submitQuery() {
		searchResults = [];
		searchParams[pageVariable] = '1';
		setSourceConfig(sourceConfig);
		console.log(sourceConfig);
		try {
			searchResults = await search({ sourceConfigId: sourceConfig.id, searchParams: searchParams });
			firstSearchResultLength = searchResults.length;
			if (searchResults.length == 0) {
				alert("search completed, no results");
			}
		} catch (e) {
			alert(`Search went boom: ${e.message}`)
		}
	}

	async function getNextPage() {
		if (isSearching) {
			return;
		}
		try {
			isSearching = true;
			incrementPageNumber(searchParams, sourceConfig.htmlSearchRuleSet);
			const nextPage =  await search({ sourceConfigId: sourceConfig.id, searchParams: searchParams });
			if (nextPage.length < firstSearchResultLength) {
				scrollThreshold = 0;
			}
			// all the results are the same
			if (nextPage.every((n) => (searchResults.some((o) => n.hash == o.hash )))) {
				scrollThreshold = 0;
				return;
			}
			searchResults = searchResults.concat(nextPage); 
			isSearching = false;
		} catch (e) {
			scrollThreshold = 0;
			isSearching = false;
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
<button on:click={getNextPage}>next</button>
<select bind:value="{sourceConfigId}">
{#each sourceConfigs as config }
	<option value={config.id}>{config.name}</option>	
{/each }
</select>

<div id='results'>
{#each searchResults as result }
	<SearchResultComponent data={result} on:searchResultClicked={addToHistory}/>	
	<InfiniteScroll threshold={scrollThreshold} on:loadMore={getNextPage} /> 	
{/each }
</div>
<svelte:window on:keypress={submitIfEnter}/>


<style>
	#results 
{
    width: 800px;
    max-height: 400px;
    overflow-x: scroll;
  }
	
</style>

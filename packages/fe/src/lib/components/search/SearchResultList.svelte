<script lang="ts">
	import SearchResultComponent from '../search/SearchResult.svelte';
	import type { SearchResult, SourceSiteConfig } from '@lawbrador/shared';
	import InfiniteScrollLoader from './InfiniteScrollLoader.svelte';

	export let sourceConfig: SourceSiteConfig;
	export let searchResults: SearchResult[] = [];
	export let hasMore = true;
	export let loaderIsVisible = true;
</script>

<div id="results" >
	{#each searchResults ?? [] as result}
		<SearchResultComponent data={result} {sourceConfig} />
	{/each}
	<InfiniteScrollLoader bind:hasMore bind:loaderIsVisible on:bottomReached/>
</div>

<style>
	#results {
		width: 90vw;
		max-height: 80vh;
		overflow-x: scroll;
	}
</style>

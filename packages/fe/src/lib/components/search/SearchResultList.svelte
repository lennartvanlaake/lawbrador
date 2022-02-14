<script lang="ts">
	import SearchResultComponent from '../search/SearchResult.svelte';
	import InfiniteScroll from 'svelte-infinite-scroll';
	import { incrementPageNumber } from '@lawbrador/shared';
	import type { SearchResult, SourceSiteConfig } from '@lawbrador/shared';
	import { search } from '$lib/ts/api';

	export let sourceConfig: SourceSiteConfig;
	export let searchResults: SearchResult[] = [];
	export let searchParams: Record<string, string>;
	let scrollThreshold: number = Number.MAX_VALUE;
	let isSearching = false;
	let firstSearchResultLength: number;
	async function getNextPage() {
		console.log("getting next");
		if (isSearching) {
			return;
		}
		try {
			isSearching = true;
			incrementPageNumber(searchParams, sourceConfig.htmlSearchRuleSet);
			const nextPage = (await search({
				sourceConfigId: sourceConfig._id,
				searchParams: searchParams
			})).results;
			if (nextPage.length < firstSearchResultLength) {
				scrollThreshold = 0;
			}
			// all the results are the same
			const nextPageHashes = nextPage.map((r) => r.hash);
			const searchResultHashes = searchResults.map((r) => r.hash); 
			if (nextPageHashes.every((r) => searchResultHashes.includes(r))) {
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
</script>

<div id="results">
	{#each searchResults ?? [] as result}
		<SearchResultComponent data={result} {sourceConfig} />
		<InfiniteScroll threshold={scrollThreshold} on:loadMore={getNextPage} />
	{/each}
</div>

<style>
	#results {
		width: 90vw;
		max-height: 80vh;
		overflow-x: scroll;
	}
</style>

<script lang="ts">
	import SearchResultComponent from '../search/SearchResult.svelte';
	import type { SearchResult, SourceSiteConfig } from '@lawbrador/shared';
	import InfiniteScrollLoader from './InfiniteScrollLoader.svelte';
	import Modal from '../common/Modal.svelte';
	import Spinner from '../common/Spinner.svelte';

	export let sourceConfig: SourceSiteConfig;
	export let searchResults: SearchResult[] = [];
	export let hasMore = true;
	export let loaderIsVisible = true;
	export let hasSearched = false;
	export let hasClicked = false;
</script>

{#if hasClicked}
	<Modal>
		<h1>Fetching<Spinner /></h1>
	</Modal>
{/if}

<div id="results">
	{#each searchResults ?? [] as result}
		<SearchResultComponent
			data={result}
			{sourceConfig}
			on:searchResultClicked={() => (hasClicked = true)}
		/>
	{/each}
	{#if hasSearched}
		<InfiniteScrollLoader bind:hasMore bind:loaderIsVisible on:bottomReached />
	{/if}
</div>

<style>
	#results {
		max-height: 80vh;
		overflow-x: scroll;
	}
	h1 {
		text-align: center;
	}
</style>

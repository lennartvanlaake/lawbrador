<script lang="ts">
	import SearchInput from '$lib/components/search/SearchInput.svelte';
	import SearchResultList from '$lib/components/search/SearchResultList.svelte';
	import SourceConfigSelector from '$lib/components/search/SourceConfigSelector.svelte';
	import { submitQuery, getNextPage } from '$lib/ts/search';
	import { doIfEnter, scrollToBottomSreen } from '$lib/ts/utils';
	import type { SourceSiteConfig } from '@lawbrador/shared';
	import { onMount, tick } from 'svelte';
	import type { IndexProps } from './types';
	import { queryToHighlight } from '$lib/ts/stores';

	export let indexProps: IndexProps;
	let timeout: number;
	const TIMEOUT_VALUE = 100;

	let hasSearched = indexProps.searchResults.length > 0;
	let firstSearchResultLength: number | undefined = hasSearched
		? indexProps.searchResults.length
		: undefined;
	let hasMore = true;
	let spinnerIsVisible = true;
	let isLoading = false;
	

	if (hasSearched) {
		$queryToHighlight = indexProps.searchParams.query!;
	}


	function setSourceConfig(e: CustomEvent<SourceSiteConfig>) {
		indexProps = { ...indexProps, sourceConfig: e.detail };
	}

	async function page() {
		if (isLoading) return;
		console.log('start loading page');
		try {
			isLoading = true
				if (!firstSearchResultLength) return;
				const pageResult = await getNextPage(
					firstSearchResultLength,
					indexProps.searchParams,
					indexProps.searchResults,
					indexProps.sourceConfig
				);
				indexProps.searchResults = pageResult.searchResults;
				indexProps.searchParams = pageResult.searchParams;
				hasMore = !pageResult.isLast;
		} catch (e) {
			alert(e.message);
			hasMore = false;
		} finally {
			isLoading = false;
			console.log('finish loading page');
		}
	}

	async function onQuerySubmitted() {
		try {
			hasSearched = true;
			indexProps.searchResults = [];
			indexProps.searchResults = await submitQuery(
				indexProps.searchParams,
				indexProps.sourceConfig
			);
			firstSearchResultLength = indexProps.searchResults.length;
			$queryToHighlight = indexProps.searchParams.query!;
			await tick();
			if (hasMore && spinnerIsVisible) {
				await page();
			}
			scrollToBottomSreen();
		} catch (e) {
			alert(e.message);
			hasMore = false;
		}
	}

	onMount(() => {
		if (hasSearched) {
			scrollToBottomSreen();
		}
	});
</script>

<img src="/logo.png" alt="lawbrador logo" />

<h3>Source</h3>
<SourceConfigSelector
	sourceConfig={indexProps.sourceConfig}
	sourceConfigList={indexProps.sourceConfigs}
	sourceConfigId={indexProps.sourceConfig
		? indexProps.sourceConfig._id
		: indexProps.query.get('sourceConfigId')}
	on:configSelected={setSourceConfig}
/>
<h3>Query</h3>
<SearchInput
	bind:searchParams={indexProps.searchParams}
	sourceConfig={indexProps.sourceConfig}
	on:querySubmitted={onQuerySubmitted}
/>
<SearchResultList
	bind:searchResults={indexProps.searchResults}
	bind:hasMore
	sourceConfig={indexProps.sourceConfig}
	{hasSearched}
	on:spinnerBecameVisible={() => { spinnerIsVisible = true; page(); }}
	on:spinnerBecameHidden={() => spinnerIsVisible = false}
/>
<svelte:window on:keypress={(event) => doIfEnter(event, async () => await onQuerySubmitted())} />

<style>
	img {
		padding-top: 1rem;
	}
</style>

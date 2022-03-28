<script lang="ts">
	import SearchInput from '$lib/components/search/SearchInput.svelte';
	import SearchResultList from '$lib/components/search/SearchResultList.svelte';
	import SourceConfigSelector from '$lib/components/search/SourceConfigSelector.svelte';
	import { submitQuery, getNextPage, getInputFromSearchParams } from '$lib/ts/search';
	import { doIfEnter, scrollToBottomSreen } from '$lib/ts/utils';
	import type { SourceSiteConfig } from '@lawbrador/shared';
	import { tick, onMount } from 'svelte';
	import type { IndexProps } from './types';
	import { Mutex } from 'async-mutex';
	import { queryToHighlight } from '$lib/ts/stores';
	import Modal from '../common/Modal.svelte';
	import Spinner from '../common/Spinner.svelte';
	export let indexProps: IndexProps;

	let firstSearchResultLength: number;
	let hasMore = true;
	let loaderIsVisible = true;
	let hasSearched = false;
	let showModal = false;
	// mutex guarantees we don't get multiple running queries
	const mutex = new Mutex();

	function setSourceConfig(e: CustomEvent<SourceSiteConfig>) {
		indexProps = { ...indexProps, sourceConfig: e.detail };
	}

	async function page() {
		try {
			console.log('next page');
			await mutex.waitForUnlock();
			await mutex.runExclusive(async () => {
				const pageResult = await getNextPage(
					firstSearchResultLength,
					indexProps.searchParams,
					indexProps.searchResults,
					indexProps.sourceConfig
				);
				indexProps.searchResults = pageResult.searchResults;
				indexProps.searchParams = pageResult.searchParams;
				hasMore = !pageResult.isLast;
			});
		} catch (e) {
			alert(e.message);
		}
	}

	async function onQuerySubmitted() {
		try {
			hasSearched = true;
			showModal = true;
			await mutex.runExclusive(async () => {
				indexProps.searchResults = await submitQuery(
					indexProps.searchParams,
					indexProps.sourceConfig
				);
				firstSearchResultLength = indexProps.searchResults.length;
				$queryToHighlight =
					indexProps.searchParams[indexProps.sourceConfig.htmlSearchRuleSet.queryVariable];
			});
			await tick();
			// keep adding results until there are no more or the list is scrollable
			while (loaderIsVisible && hasMore) {
				await page();
				await tick();
			}
			scrollToBottomSreen();
		} catch (e) {
			alert(e.message);
		} finally {
			showModal = false;
		}
	}

	const paramsFromQuery = getInputFromSearchParams(indexProps.query, indexProps.sourceConfig);
	onMount(async () => {
		if (paramsFromQuery) {
			indexProps.searchParams = paramsFromQuery;
			await onQuerySubmitted();
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
	bind:loaderIsVisible
	bind:searchResults={indexProps.searchResults}
	bind:hasMore
	sourceConfig={indexProps.sourceConfig}
	{hasSearched}
	on:bottomReached={page}
/>
<svelte:window on:keypress={(event) => doIfEnter(event, async () => await onQuerySubmitted())} />

{#if showModal}
	<Modal>
		<div id="spinner">
			<Spinner />
		</div>
	</Modal>
{/if}

<style>
	img {
		padding-top: 1rem;
	}

	#spinner {
		font-size: 6rem;
		text-align: center;
	}
</style>

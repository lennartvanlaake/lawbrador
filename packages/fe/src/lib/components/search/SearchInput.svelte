<script lang="ts">
	import { search } from '$lib/ts/api';
	import SearchOptions from './SearchOptions.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
	import type { SearchResult } from '@lawbrador/shared/src/schemas/search';
	export let sourceConfig: SourceSiteConfig;
	export let searchResults: SearchResult[] = [];
	export let searchParams: Record<string, string>;
	$: queryVariable = sourceConfig?.htmlSearchRuleSet.queryVariable;
	$: pageVariable = sourceConfig?.htmlSearchRuleSet.pageVariable;

	async function submitIfEnter(event: KeyboardEvent) {
		if (event.key == 'Enter') {
			await submitQuery();
		}
	}
	async function submitQuery() {
		searchResults = [];
		searchParams[pageVariable] = '1';
		console.log(sourceConfig);
		try {
			searchResults = (
				await search({ sourceConfigId: sourceConfig._id!!, searchParams: searchParams })
			).results;
			if (searchResults.length == 0) {
				alert('search completed, no results');
			}
			addToHistory();
		} catch (e) {
			console.error(e);
			alert(`Search went boom: ${e.message}`);
		}
	}

	function addToHistory() {
		let url = `?sourceConfigId=${sourceConfig._id!!}`;
		sourceConfig.searchUrlConfig.queryComponents.forEach((queryParam) => {
			const component = queryParam.urlComponent;
			if ('variableName' in component) {
				const paramValue = searchParams[component.variableName];
				if (component.variableName != sourceConfig.htmlSearchRuleSet.pageVariable && paramValue) {
					url = url + `&${component.variableName}=${paramValue}`;
				}
			}
		});
		window.history.pushState({}, 'Home', url);
	}
</script>

<input type="text" id="text-field" bind:value={searchParams[queryVariable]} />
<SearchOptions bind:searchParams {sourceConfig} />
<div>
<button on:click={submitQuery}>search</button>
</div>
<svelte:window on:keypress={submitIfEnter} />

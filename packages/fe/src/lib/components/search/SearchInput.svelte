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
			addToHistory();
		} catch (e) {
			console.error(e);
			alert(`Search went boom: ${e.message}`)
		}
	}
	
	function addToHistory() {
		let url = `?sourceConfigId=${sourceConfig.id}`;
		Object.values(sourceConfig.searchUrlConfig.queryComponents).forEach((component) => { 
			const paramValue = searchParams[component.variableName];
			if (component.variableName != sourceConfig.htmlSearchRuleSet.pageVariable && paramValue) {
				url = url + `&${component.variableName}=${paramValue}`
			}
		})
		window.history.pushState({}, "Home", url)
	}
</script>

<h1>Search here</h1>
<input type="text" id="text-field" bind:value={searchParams[queryVariable]} />
<SearchOptions bind:searchParams={searchParams} sourceConfig={sourceConfig} />
<button on:click={submitQuery}>search</button>
<svelte:window on:keypress={submitIfEnter}/>

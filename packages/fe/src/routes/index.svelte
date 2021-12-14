<script context="module" lang="ts">
	// use for debugging
	export const ssr = false;
	import type { SourceSiteConfig } from '@legalthingy/shared/schemas/rules';
	import type {  SearchResult } from '@legalthingy/shared/schemas/search';
	import type { Load } from "@sveltejs/kit";
	import { getSourceConfigs } from "$lib/api";
	import SearchResultList from '$lib/components/search/SearchResultList.svelte';
	import SearchInput from '$lib/components/search/SearchInput.svelte';
	import SourceConfigSelector from '$lib/components/search/SourceConfigSelector.svelte';
	
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
	export let sourceConfigs: SourceSiteConfig[];
	export let query: URLSearchParams;
	let sourceConfig: SourceSiteConfig;
	let searchResults: SearchResult[] = [];	
	let searchParams = {};
        $: setFirstSearchParams(sourceConfig);
	function setFirstSearchParams(sourceConfig: SourceSiteConfig) {
		searchParams = Object.values(sourceConfig?.searchUrlConfig.queryComponents ?? {}).reduce((acc, cur) => {
			const queryValue = query.get(cur.variableName);
			if (queryValue) {
				acc[cur.variableName] = queryValue;
			}
			return acc;
		}, {})
	}
</script>


<SearchInput bind:searchResults={searchResults} sourceConfig={sourceConfig}  bind:searchParams={searchParams}  />
<SourceConfigSelector bind:sourceConfig={sourceConfig} sourceConfigList={sourceConfigs} sourceConfigId={query.get('sourceConfigId')} />
<SearchResultList bind:searchResults={searchResults} sourceConfig={sourceConfig} bind:searchParams={searchParams}  />



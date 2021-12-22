<script context="module" lang="ts">
	// use for debugging
	/*export const ssr = false;*/
	import { search } from '$lib/api';	
	import type { SourceSiteConfig } from '@legalthingy/shared/schemas/rules';
	import type {  SearchResult } from '@legalthingy/shared/schemas/search';
	import type { Load } from "@sveltejs/kit";
	import { getSourceConfigs } from "$lib/api";
	import SearchResultList from '$lib/components/search/SearchResultList.svelte';
	import SearchInput from '$lib/components/search/SearchInput.svelte';
	import SourceConfigSelector from '$lib/components/search/SourceConfigSelector.svelte';
	
	export const load: Load = async ({ page, fetch}) => {
		const sources: SourceSiteConfig[] = await getSourceConfigs(fetch);
		const sourceConfig = sources.find(s => s.id == page.query.get("sourceConfigId")) ?? sources[0];
		const searchParams: any = Object.values(sourceConfig.searchUrlConfig.queryComponents ?? {}).reduce((acc, cur) => {
			const queryValue = page.query.get(cur.variableName);
			if (cur.variableName != sourceConfig.htmlSearchRuleSet.pageVariable && queryValue) {
				acc[cur.variableName] = queryValue;
			}
			return acc;
		}, {});
		let searchResults: SearchResult[];
		if (page.query.get(sourceConfig.htmlSearchRuleSet.queryVariable)) {
			searchResults = await search({ sourceConfigId: sourceConfig.id, searchParams: searchParams });
		} else {
			searchResults = [];
		}
		return { 
			props: {
				query: page.query,
				sourceConfigs: sources,
				sourceConfig: sourceConfig,
				searchParams: searchParams,
				searchResults: searchResults,
			}
		};
	}
</script>

<script lang="ts">
	export let sourceConfigs: SourceSiteConfig[];
	export let query: URLSearchParams;
	export let searchParams: Record<string, string>;
	export let sourceConfig: SourceSiteConfig;
	export let searchResults: SearchResult[];	
</script>


<SearchInput bind:searchResults={searchResults} sourceConfig={sourceConfig}  bind:searchParams={searchParams}  />
<SourceConfigSelector bind:sourceConfig={sourceConfig} sourceConfigList={sourceConfigs} sourceConfigId={query.get('sourceConfigId')} />
<SearchResultList bind:searchResults={searchResults} sourceConfig={sourceConfig} bind:searchParams={searchParams}  />



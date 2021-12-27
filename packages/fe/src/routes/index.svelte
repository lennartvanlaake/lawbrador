<script context="module" lang="ts">
	// use for debugging
	/*export const ssr = false;*/
	import Index from '$lib/pages/Index.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
	import type { SearchResult } from '@lawbrador/shared/src/schemas/search';
	import type { Load } from '@sveltejs/kit';
	import { getSourceConfigs } from '$lib/api';
	import type { IndexProps } from '$lib/pages/types';

	export const load: Load = async ({ page, fetch }) => {
		const sources: SourceSiteConfig[] = await getSourceConfigs(fetch);
		const sourceConfig =
			sources.find((s) => s.id == page.query.get('sourceConfigId')) ?? sources[0];
		const searchParams: any = Object.values(
			sourceConfig.searchUrlConfig.queryComponents ?? {}
		).reduce((acc, cur) => {
			const queryValue = page.query.get(cur.variableName);
			if (cur.variableName != sourceConfig.htmlSearchRuleSet.pageVariable && queryValue) {
				acc[cur.variableName] = queryValue;
			}
			return acc;
		}, {});
		let searchResults: SearchResult[];
		if (page.query.get(sourceConfig.htmlSearchRuleSet.queryVariable)) {
			searchResults = [];
		}
		const indexProps: IndexProps = {
			query: page.query,
			sourceConfigs: sources,
			sourceConfig: sourceConfig,
			searchParams: searchParams,
			searchResults: searchResults
		};
		return {
			props: {
				indexProps: indexProps
			}
		};
	};
</script>

<script lang="ts">
	export let indexProps: IndexProps;
</script>

<Index {indexProps} />

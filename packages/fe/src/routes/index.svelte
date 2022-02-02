<script context="module" lang="ts">
		export const hydrate = true;

	import Index from '$lib/components/page/Index.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
	import type { SearchResult } from '@lawbrador/shared/src/schemas/search';
	import type { Load } from '@sveltejs/kit';
	import { getSourceConfigs } from '$lib/ts/api';
	import type { IndexProps } from '$lib/components/page/types';

	const baseUrl = import.meta.env.VITE_URL ?? "";
	import * as Endpoints from '@lawbrador/shared/src/endpoints';
	export const load: Load = async ({ url, fetch }) => {
		const query = url.searchParams;
		const sources: SourceSiteConfig[] = await (await fetch(`${baseUrl}${Endpoints.SOURCES_ENDPOINT}`)).json();
		const sourceConfig =
			sources.find((s) => s._id == query.get('sourceConfigId')) ?? sources[0];
		const searchParams: any = sourceConfig?.searchUrlConfig?.queryComponents?.reduce((acc, cur) => {
			const queryValue = query.get('variableName');
			if ("variableName" in cur.urlComponent) {
				if (cur.urlComponent.variableName != sourceConfig.htmlSearchRuleSet.pageVariable && queryValue) {
					acc[cur.urlComponent.variableName] = queryValue;
				}
			}
			return acc;
		}, {}) ?? {};
		let searchResults: SearchResult[] = [];
		if (query.get(sourceConfig?.htmlSearchRuleSet?.queryVariable)) {
			searchResults = [];
		}
		const indexProps: IndexProps = {
			query: query,
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

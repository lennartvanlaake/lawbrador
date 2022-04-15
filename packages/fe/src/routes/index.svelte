<script context="module" lang="ts">
	export const hydrate = true;

	import Index from '$lib/components/page/Index.svelte';
	import type { SearchParams, SourceSiteConfig } from '@lawbrador/shared';
	import type { SearchResult } from '@lawbrador/shared';
	import type { Load } from '@sveltejs/kit';
	import type { IndexProps } from '$lib/components/page/types';
	import { getInputFromSearchParams, submitQuery } from '$lib/ts/search';
	import { getSourceConfigs } from '$lib/ts/api';
	export const load: Load = async ({ url, fetch }) => {
		const query = url.searchParams;
		const sources: SourceSiteConfig[] = await getSourceConfigs(fetch);
		//@ts-ignore
		const sourceConfig = sources.find((s) => s._id == query.get('sourceConfigId')) ?? sources[0];
		const urlSearchParams: SearchParams | null = getInputFromSearchParams(query);
		let searchResults: SearchResult[] = urlSearchParams
			? await submitQuery(urlSearchParams, sourceConfig)
			: [];
		const indexProps: IndexProps = {
			query: query,
			sourceConfigs: sources,
			sourceConfig: sourceConfig,
			searchParams: urlSearchParams ?? {},
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

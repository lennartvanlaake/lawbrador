<script context="module" lang="ts">
	export const hydrate = true;

	import Index from '$lib/components/page/Index.svelte';
	import type { SearchParams, SourceSiteConfig } from '@lawbrador/shared';
	import type { SearchResult } from '@lawbrador/shared';
	import type { Load } from '@sveltejs/kit';
	import type { IndexProps } from '$lib/components/page/types';

	const baseUrl = import.meta.env.VITE_URL ?? '';
	import { Endpoints } from '@lawbrador/shared';
	import { QUERY_VARIABLE_NAME } from '@lawbrador/shared/src/constants/other';
	import { getInputFromSearchParams, submitQuery } from '$lib/ts/search';
	export const load: Load = async ({ url, fetch }) => {
		const query = url.searchParams;
		const sources: SourceSiteConfig[] = await (
			await fetch(`${baseUrl}${Endpoints.SOURCES}`)
		).json();
		const sourceConfig =
			//@ts-ignore
			sources.find((s) => s._id == query.get('sourceConfigId')) ?? sources[0];
		const urlSearchParams: SearchParams | null = getInputFromSearchParams(query) ?? {};
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

<script lang="ts">
	import SearchInput from '$lib/components/search/SearchInput.svelte';
	import SearchResultList from '$lib/components/search/SearchResultList.svelte';
	import SourceConfigSelector from '$lib/components/search/SourceConfigSelector.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared';
	import type { IndexProps } from './types';
	export let indexProps: IndexProps;
	function setSourceConfig(e: CustomEvent<SourceSiteConfig>) {
		indexProps = { ...indexProps, sourceConfig: e.detail };
	}
</script>

<h1>Search here</h1>
<SourceConfigSelector
	sourceConfig={indexProps.sourceConfig}
	sourceConfigList={indexProps.sourceConfigs}
	sourceConfigId={indexProps.sourceConfig ? indexProps.sourceConfig._id : indexProps.query.get('sourceConfigId')}
	on:configSelected={setSourceConfig}
/>
<SearchInput
	bind:searchResults={indexProps.searchResults}
	sourceConfig={indexProps.sourceConfig}
	bind:searchParams={indexProps.searchParams}
/>
<SearchResultList
	bind:searchResults={indexProps.searchResults}
	sourceConfig={indexProps.sourceConfig}
	bind:searchParams={indexProps.searchParams}
/>

<script lang="ts">
	import SearchInput from '$lib/components/search/SearchInput.svelte';
	import SearchResultList from '$lib/components/search/SearchResultList.svelte';
	import SourceConfigSelector from '$lib/components/search/SourceConfigSelector.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
	import type { IndexProps } from './types';
	export let indexProps: IndexProps;
	function setSourceConfig(e: CustomEvent<SourceSiteConfig>) {
		indexProps = { ...indexProps, sourceConfig: e.detail };
		console.log(e.detail);
		console.log(indexProps);
	}
</script>

<SearchInput
	bind:searchResults={indexProps.searchResults}
	sourceConfig={indexProps.sourceConfig}
	bind:searchParams={indexProps.searchParams}
/>
<SourceConfigSelector
	sourceConfig={indexProps.sourceConfig}
	sourceConfigList={indexProps.sourceConfigs}
	sourceConfigId={indexProps.query.get('sourceConfigId')}
	on:configSelected={setSourceConfig}
/>
<SearchResultList
	bind:searchResults={indexProps.searchResults}
	sourceConfig={indexProps.sourceConfig}
	bind:searchParams={indexProps.searchParams}
/>

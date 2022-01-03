<script lang="ts">
	import SearchInput from '$lib/components/search/SearchInput.svelte';
	import SearchResultList from '$lib/components/search/SearchResultList.svelte';
	import SourceConfigSelector from '$lib/components/search/SourceConfigSelector.svelte';
	import type { IndexProps } from './types';
	export let indexProps: IndexProps;
</script>

<SearchInput
	bind:searchResults={indexProps.searchResults}
	sourceConfig={indexProps.sourceConfig}
	bind:searchParams={indexProps.searchParams}
/>
<SourceConfigSelector
	bind:sourceConfig={indexProps.sourceConfig}
	sourceConfigList={indexProps.sourceConfigs}
	sourceConfigId={indexProps.query.get('sourceConfigId')}
/>
<SearchResultList
	bind:searchResults={indexProps.searchResults}
	sourceConfig={indexProps.sourceConfig}
	bind:searchParams={indexProps.searchParams}
/>

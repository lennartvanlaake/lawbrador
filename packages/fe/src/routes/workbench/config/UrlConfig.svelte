<script lang="ts">
	import View from '$lib/components/workbench/View.svelte';
	import EditableUrlConfig from '$lib/components/config/EditableUrlConfig.svelte';
	import { eurlexConfig, EMPTY_URL_CONFIG } from '@lawbrador/shared';
	let eurlexSearch = eurlexConfig.searchUrlConfig;
	let invalidUrl = { ...eurlexSearch };
	invalidUrl.base = 'bla';
</script>

<View name="Empty">
	<EditableUrlConfig urlConfig={EMPTY_URL_CONFIG} />
</View>
<View name="Eurlex search">
	<EditableUrlConfig bind:urlConfig={eurlexSearch} />
</View>
<View name="Eurlex search with invalid url">
	<EditableUrlConfig bind:urlConfig={invalidUrl} />
</View>

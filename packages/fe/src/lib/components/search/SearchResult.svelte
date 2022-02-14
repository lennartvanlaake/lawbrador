<script lang="ts">
	import type { SearchResult, SourceSiteConfig } from '@lawbrador/shared';
	import { createEventDispatcher } from 'svelte';
	export let data: SearchResult;
	export let sourceConfig: SourceSiteConfig;
	const dispatch = createEventDispatcher();
	async function onClick() {
		dispatch('searchResultClicked');
	}
</script>

<p>
	<a href={`/document/?url=${encodeURIComponent(data.href)}&sourceConfigId=${sourceConfig._id}`} on:click|once={onClick}>{data.text}</a>
</p>

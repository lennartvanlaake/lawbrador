<script lang="ts">
	import SearchOptions from './SearchOptions.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared';
	import { createEventDispatcher } from 'svelte';
	export let sourceConfig: SourceSiteConfig;
	export let searchParams: Record<string, string> = {};
	const dispatch = createEventDispatcher<{ querySubmitted: Record<string, string> }>();
</script>

<input
	type="text"
	id="text-field"
	bind:value={searchParams[sourceConfig?.htmlSearchRuleSet?.queryVariable]}
/>
<SearchOptions bind:searchParams {sourceConfig} />
<div>
	<button on:click={() => dispatch('querySubmitted', searchParams)}>search</button>
</div>

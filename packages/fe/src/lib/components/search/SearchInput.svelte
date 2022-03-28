<script lang="ts">
	import SearchOptions from './SearchOptions.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared';
	import { createEventDispatcher } from 'svelte';
	export let sourceConfig: SourceSiteConfig | null = null;
	import { QUERY_VARIABLE_NAME } from '@lawbrador/shared/src/constants/other';
	export let searchParams: Record<string, string> = {};
	const dispatch = createEventDispatcher<{ querySubmitted: Record<string, string> }>();
</script>

{#if sourceConfig}
	<input type="text" id="text-field" bind:value={searchParams[QUERY_VARIABLE_NAME]} />
	<SearchOptions bind:searchParams {sourceConfig} />
	<div>
		<button on:click={() => dispatch('querySubmitted', searchParams)}>search</button>
	</div>
{/if}

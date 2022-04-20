<script lang="ts">
	import HighlightControl from './HighlightControl.svelte';

	import { queryToHighlight } from '$lib/ts/stores';
	import HeaderIndex from './HeaderIndex.svelte';
	import type { RenderedDocument, RestructuredNode } from '@lawbrador/shared';
	export let renderedDocument: RenderedDocument;
	export let documentElement: Element;
	export let node: RestructuredNode;
	let searchEnabled = !!$queryToHighlight;
	let indexEnabled = false;
	function toggleSearch() {
		searchEnabled = !searchEnabled;
	}

	function toggleIndex() {
		indexEnabled = !indexEnabled;
	}
</script>

<div class="fixed-bottom">
	{#if indexEnabled}
		<HeaderIndex {node} bind:show={indexEnabled} />
	{/if}
	{#if searchEnabled}
		<HighlightControl bind:renderedDocument bind:enabled={searchEnabled} {documentElement} />
	{/if}
	<div id="control">
		<i class="fa-solid fa-magnifying-glass" on:click={toggleSearch} />
		<span class="right-icons">
			<i class="fa-solid fa-file-lines" on:click={toggleIndex} />
		</span>
	</div>
</div>

<style>
	.fixed-bottom {
		background-color: white;
		position: fixed;
		bottom: 0px;
		width: 100%;
		max-width: 45rem;
	}

	#control {
		background-color: white;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
	}
	.right-icons {
		margin-left: auto;
	}
</style>

<script lang="ts">
	import type { Header } from '$lib/ts/types';
	import { scrollToCenter } from '$lib/ts/utils';
	import { createEventDispatcher } from 'svelte';
	import Collapsable from '../common/Collapsable.svelte';
	export let header: Header;
	const dispatch = createEventDispatcher<{ linkClicked: any }>();
	function scroll(ev: Event) {
		ev.preventDefault();
		scrollToCenter(header.id);
		dispatch('linkClicked');
	}
</script>

{#if header.children.length > 0}
	<Collapsable>
		<a href="#{header.id}" slot="title" on:click={scroll}>
			<h3 class="white">{header.fullText}</h3>
		</a>
		{#each header.children as child}
			<svelte:self header={child} on:linkClicked />
		{/each}
	</Collapsable>
{:else}
	<a href="#{header.id}" on:click={scroll}>
		<h3>{header.fullText}</h3>
	</a>
{/if}

<style>
	.white {
		color: white !important;
	}
</style>

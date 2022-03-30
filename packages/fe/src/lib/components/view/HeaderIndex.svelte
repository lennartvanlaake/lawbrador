<script lang="ts">
	import type { RestructuredNode } from '@lawbrador/shared';
	import Modal from '../common/Modal.svelte';
	import CollapsibleHeaderLink from './CollapsibleHeaderLink.svelte';
	import { generateHeaderIndex } from '$lib/ts/headerIndex';
	export let show = false;
	export let node: RestructuredNode;
	$: headers = generateHeaderIndex(node);

	function close() {
		show = false;
	}
</script>

{#if show}
	<Modal closable={true}>
		<h2>Index</h2>
		<div id="bg">
			{#each headers as headerLink}
				<CollapsibleHeaderLink header={headerLink} on:linkClicked={close} />
			{/each}
		</div>
	</Modal>
{/if}

<style>
	#bg {
		padding: 1rem;
		background-color: var(--accent-very-light);
	}
</style>

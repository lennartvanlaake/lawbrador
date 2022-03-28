<script lang="ts">
	import { scrollToCenter } from '$lib/ts/utils';

	import type { RestructuredNode } from '@lawbrador/shared';
	import { renderNode } from '@lawbrador/shared';
	import Modal from '../common/Modal.svelte';
	export let show = false;
	export let headers: RestructuredNode[];

	function closeAndScroll(ev: Event, header: RestructuredNode) {
		ev.preventDefault();
		show = false;
		scrollToCenter(header.id);
	}
</script>

{#if show}
	<Modal closable={true}>
		<div>
			{#each headers as headerLink}
				<a href="#{headerLink.id}" on:click={(ev) => closeAndScroll(ev, headerLink)}>
					{@html renderNode(headerLink)}
				</a>
			{/each}
		</div>
	</Modal>
{/if}

<style>
	/*div :global(h1) {*/
	/*color: purple*/
	/*}*/
</style>

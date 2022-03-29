<script lang="ts">
	import { scrollToCenter } from '$lib/ts/utils';

	import type { RestructuredNode } from '@lawbrador/shared';
	import { renderText } from '@lawbrador/shared';
	import { renderNode } from '@lawbrador/shared';
	import Modal from '../common/Modal.svelte';
	export let show = false;
	export let headers: RestructuredNode[] = [];
	interface Header {
		parent: Header | null;
		fullText: string;
		level: number;
		children: Header[];
	}
	$: nestedHeaders = nest(headers);

	function toHeader(node: RestructuredNode): Header {
		return { fullText: renderText(node), level: getHeaderLevel(node), children: [], parent: null };
	}

	function getFirstLowerHeader(parentHeader: Header | null, currentLevel: number) {
		if (!parentHeader) return null;
		if (parentHeader.level < currentLevel) return parentHeader;
		return getFirstLowerHeader(parentHeader.parent, currentLevel);
	}

	function nest(headerList: RestructuredNode[]) {
		const headers = headerList.map((it) => toHeader(it));
		let previousHeader: Header | null = null;
		for (let i = 0; i < headers.length; i++) {
			const currentHeader = headers[i];
			if (!currentHeader) break;
			currentHeader.parent = previousHeader;
			const firstLowerHeader = getFirstLowerHeader(previousHeader, currentHeader.level);
			if (previousHeader && previousHeader.level < currentHeader.level) {
				previousHeader.children.push(currentHeader);
			} else if (previousHeader && previousHeader.level == currentHeader.level) {
				previousHeader.parent?.children.push(currentHeader);
			} else if (firstLowerHeader) {
				firstLowerHeader.children.push(currentHeader);
			} else {
				previousHeader = currentHeader;
				continue;
			}
			previousHeader = currentHeader;
			headers.splice(i, 1);
			i--;
		}
		console.log(headers);
		return headers;
	}

	function getHeaderLevel(node: RestructuredNode) {
		try {
			return parseInt(node.name.charAt(1));
		} catch (e) {
			return Number.MAX_VALUE;
		}
	}

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

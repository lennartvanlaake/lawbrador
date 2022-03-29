<script lang="ts">
	import { scrollToCenter } from '$lib/ts/utils';

	import type { RestructuredNode } from '@lawbrador/shared';
	import type { Header } from '$lib/ts/types';
	import { renderText } from '@lawbrador/shared';
	import { renderNode } from '@lawbrador/shared';
	import Modal from '../common/Modal.svelte';
	import CollapsibleHeaderLink from './CollapsibleHeaderLink.svelte';
	export let show = false;
	export let headers: RestructuredNode[] = [];
	$: nestedHeaders = nest(headers);

	function toHeader(node: RestructuredNode): Header {
		return {
			fullText: renderText(node),
			level: getHeaderLevel(node),
			children: [],
			parent: null,
			id: node.id
		};
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

	function close() {
		show = false;
	}
</script>

{#if show}
	<Modal closable={true}>
		<h2>Index</h2>
		<div id="bg">
			{#each nestedHeaders as headerLink}
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

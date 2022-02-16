<script lang="ts">
	import type { RestructuredDocument } from '@lawbrador/shared';
	import NodeView from './NodeView.svelte';
	export let document: RestructuredDocument;
</script>

{#if document}
	<a href={document.url} target="_blank">original</a>
	{#each document.body.children ?? [] as node}
		<NodeView {node} />
	{/each}
{/if}

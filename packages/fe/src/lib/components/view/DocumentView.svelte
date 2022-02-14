<script lang="ts">
	import type { RestructuredDocument } from '@lawbrador/shared';
	import NodeView from './NodeView.svelte';
	export let document: RestructuredDocument;
</script>

{#if document}
	<h1>URL: {document.url}</h1>
	{#each document.body.children ?? [] as node}
		<NodeView {node} />
	{/each}
{/if}

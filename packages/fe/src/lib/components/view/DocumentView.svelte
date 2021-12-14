
<script lang="ts">
	import type { RestructuredDocument } from '@legalthingy/shared/schemas/document_version';
	import NodeView from './NodeView.svelte';
	export let document: RestructuredDocument;
</script>
{#if document }
	<h1>URL: { document.url }</h1>
	{#each document.nodes as node}
		<NodeView node={node} />	
	{/each}
{/if }


<script lang="ts">
	import type { DocumentVersion } from '@legalthingy/shared/schemas/document_version';
	import NodeView from './NodeView.svelte';
	export let document: DocumentVersion;
</script>
{#if document }
	<p>URL: { document.url }</p>
	{#each document.textRootNode.children as child}
		<NodeView node={child} />	
	{/each}
{/if }

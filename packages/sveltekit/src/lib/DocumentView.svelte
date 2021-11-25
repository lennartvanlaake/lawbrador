
<script lang="ts">
	import NodeView from './NodeView.svelte';
	import type { Document } from '@legalthingy/parse/src/document_factory';
	export let document: Document;
</script>
{#if document } 
	{#each document.paragraphs as par}
		<NodeView node={par} />	
	{/each}
{/if }

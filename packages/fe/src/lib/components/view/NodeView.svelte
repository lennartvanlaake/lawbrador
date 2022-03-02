<script lang="ts">
	import type { RestructuredNode } from '@lawbrador/shared'
  	import { ALL_CONTAINER_TAGS, ALL_PARAGRAPH_TAGS } from '@lawbrador/shared';
	import DivView from './DivView.svelte';
	import PargraphView from './ParagraphView.svelte';
	import LinkView from './LinkView.svelte';
	export let node: RestructuredNode;
</script>
{#if node }
{#if ALL_CONTAINER_TAGS.includes(node.name) }
	<DivView {node} />
{:else if ALL_PARAGRAPH_TAGS.includes(node.name) }
	<PargraphView {node} />
{:else if node.name == "a" } 
	<LinkView {node} />
{:else if node.name == "inline" }
	{#each node.children ?? [] as child }
		{#if child }
		<svelte:self {child} />
		{/if }
	{/each }
{:else if "text" in node && node.text }
	{node.text}
{/if}
{/if}

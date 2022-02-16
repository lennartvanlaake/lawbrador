<script lang="ts">
	import type { RestructuredNode } from '@lawbrador/shared'
  	import { ALL_CONTAINER_TAGS, ALL_PARAGRAPH_TAGS } from '@lawbrador/shared';
	import DivView from './DivView.svelte';
	import PargraphView from './ParagraphView.svelte';
	export let node: RestructuredNode;
</script>
{#if ALL_CONTAINER_TAGS.includes(node.name) }
	<DivView {node} />
{:else if ALL_PARAGRAPH_TAGS.includes(node.name) }
	<PargraphView {node} />
{:else if "text" in node }
	{node.text}
{/if}

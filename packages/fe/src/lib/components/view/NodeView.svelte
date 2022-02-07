<script lang="ts">
	import type { RestructuredNode } from '@lawbrador/shared/src/schemas/scrape'
  	import { getTagConfig } from '@lawbrador/shared/src/schemas/tags';
	import DivView from './DivView.svelte';
	import PargraphView from './ParagraphView.svelte';
	export let node: RestructuredNode;
	const tag = getTagConfig(node.name);
</script>
{#if tag.type == 'container'}
	<DivView {node} />
{:else if tag.type == 'paragraph' }
	<PargraphView {node} />
{:else if tag.type == 'text' }
	{node.text}
{/if}

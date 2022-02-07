<script lang="ts">
	import type { RestructuredNode } from '@lawbrador/shared/src/schemas/scrape'
	import DivView from './DivView.svelte';
	import PargraphView from './ParagraphView.svelte';
	export let node: RestructuredNode;
</script>

{#if node.name == 'div'}
	<DivView {node} />
{:else if node.name == 'p'}
	<PargraphView {node} />
{:else}
	{node.text}
{/if}

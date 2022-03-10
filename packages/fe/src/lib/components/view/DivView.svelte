<script lang="ts">
	import type { OtherNode } from '@lawbrador/shared';
	import NodeView from './NodeView.svelte';
	export let node: OtherNode;
</script>

{#if node.name == 'div'}
	<div>
		{#each node.children ?? [] as child}
			<NodeView node={child} />
		{/each}
	</div>
{/if}
{#if node.name == 'ol'}
	<ol>
		{#each node.children ?? [] as child}
			<NodeView node={child} />
		{/each}
	</ol>
{/if}

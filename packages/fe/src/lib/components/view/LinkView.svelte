<script lang="ts">
	import NodeView from './NodeView.svelte';
	import type { LinkNode } from '@lawbrador/shared';
	export let node: LinkNode;
</script>

<a href={node.href}>
	{#each node.children ?? [] as child}
		<NodeView node={child} />
	{/each}
</a>

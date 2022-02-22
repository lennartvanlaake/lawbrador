<script lang="ts">
	import type { RestructuredNode } from '@lawbrador/shared';
	import NodeView from './NodeView.svelte';
	export let node: RestructuredNode;
</script>
{#if node.children && node.name == "p" }
<p>
	{#each node.children as child}
		<NodeView node={child} />
	{/each}
</p>
{/if }
{#if node.children && node.name == "h1" }
<h1>
	{#each node.children as child}
		<NodeView node={child} />
	{/each}
</h1>
{/if }
{#if node.children && node.name == "h2" }
<h2>
	{#each node.children as child}
		<NodeView node={child} />
	{/each}
</h2>
{/if }
{#if node.children && node.name == "h3" }
<h3>
	{#each node.children as child}
		<NodeView node={child} />
	{/each}
</h3>
{/if }
{#if node.children && node.name == "li" && node.marker }
<li value={node.marker.text}>
	{#each node.children as child}
		<NodeView node={child} />
	{/each}
</li>
{/if }
{#if node.children && node.name == "li" && !node.marker }
<li>
	{#each node.children as child}
		<NodeView node={child} />
	{/each}
</li>
{/if }

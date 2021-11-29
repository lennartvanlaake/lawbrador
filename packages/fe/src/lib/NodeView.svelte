<script lang="ts">
	//@ts-ignore
	export let node: any;
	import { marked } from 'marked';


</script>

{#if node.type == 'title'}
	<h2>{@html marked(node.text)}</h2>
{:else if node.type == "list" }
	{#if node.subtype == "ul"}
		<ul>
			{#each node.children as child } 
				<li><svelte:self node={child} /></li>
			{/each } 
		</ul>
	{:else if node.subtype == "ol" }
		<ol>
			{#each node.children as child } 
				<li value={child.count}><svelte:self node={child} /></li>
			{/each } 
		</ol>
	{/if}
{:else if node.text }
	<p>{@html marked(node.text)}</p>
{/if }

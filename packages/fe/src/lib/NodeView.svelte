<script lang="ts">
	//@ts-ignore
	export let node: any;
</script>

{#if node.children?.length > 0 }
	{#each node.children as child } 
		<svelte:self node={child} />
	{/each } 
{:else if node.data?.length > 0 }
	<p>
		{#each node.data as fragment }
			{ fragment.text }
		{/each }
	</p>
{/if }

<script lang="ts">
	export let messages: string[] | undefined;
</script>

{#if messages}
	<ol>
		{#each messages as message}
			<li>{message}</li>
		{/each}
	</ol>
{/if}

<style>
	li {
		color: red;
	}
</style>

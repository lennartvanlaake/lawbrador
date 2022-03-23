<script lang="ts">
	export let showTooltip = false;
	export let tooltipText: string | undefined;
</script>

<i class="icon-question" class:active={showTooltip} on:click={() => (showTooltip = !showTooltip)} />

{#if showTooltip}
	<p>
		{#if tooltipText}
			<em>{tooltipText}</em>
		{:else}
			<em>No description of this source provided</em>
		{/if}
	</p>
{/if}

<style>
	i {
		margin-left: 0.5rem;
		padding: 0;
	}

	.active {
		opacity: 20%;
	}
</style>

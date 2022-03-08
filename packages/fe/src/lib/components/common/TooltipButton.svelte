<script lang="ts">
	export let showTooltip = false;
	export let tooltipText: string;
</script>

<i class="icon-question" class:active={showTooltip} on:click={() => (showTooltip = !showTooltip)} />

{#if showTooltip}
	<p>{tooltipText}</p>
{/if}

<style>
	i {
		color: var(--accent);
		cursor: pointer;
	}
	.active {
		opacity: 20%;
	}
</style>

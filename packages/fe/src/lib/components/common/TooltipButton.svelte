<script lang="ts">
	export let showTooltip = false;
	export let tooltipText:string;
</script>

<i class="fas fa-circle-question" class:active={showTooltip}></i>

{#if showTooltip }
<p>{ tooltipText }</p>
{/if}

<style>
	i {
		color: var(--accent);
	}
	.active {
		color: white;
		background-color: var(--accent);
	}
</style>

<script lang="ts">
	import type { VariableUrlComponent } from '@lawbrador/shared';
	export let option: VariableUrlComponent;
	export let value = '';
</script>

<strong>{option.variableName}</strong>
{#if option.possibleValues}
	<select bind:value on:change>
		<option value="" />
		{#each option.possibleValues as possibleValue}
			<option value={possibleValue.value}>{possibleValue.displayName ?? possibleValue.value}</option
			>
		{/each}
	</select>
{:else}
	<input type="text" bind:value />
{/if}

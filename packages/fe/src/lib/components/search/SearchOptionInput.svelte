<script lang="ts">
	import type { UrlComponent } from '@lawbrador/shared/src/schemas/rules';
	export let option: UrlComponent;
	export let value: string;
</script>

<strong>{option.variableName}</strong>
{#if option.possibleValues}
	<select bind:value>
		<option value="" />
		{#each option.possibleValues as possibleValue}
			<option value={possibleValue.value}>{possibleValue.displayName ?? possibleValue.value}</option
			>
		{/each}
	</select>
{:else}
	<input type="text" bind:value />
{/if}

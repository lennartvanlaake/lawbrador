<script lang="ts">
	import { Validator } from '$lib/ts/validate';
	import ValidatedTextField from '$lib/components/common/ValidatedTextField.svelte';
	import type { SelectionRule } from '@lawbrador/shared';
	import {
		Schemas,
		ALL_SELECTION_OPERATORS,
		ALL_SELECTION_LOCATIONS,
		DEFAULT_EMPTY_SELECTION_RULE
	} from '@lawbrador/shared';
	import Toggled from '../common/Toggled.svelte';
	import { empty } from 'svelte/internal';
	import Collapsable from '../common/Collapsable.svelte';
	export let ruleConfig: SelectionRule | undefined;
	export let title: string | null = null;
	const validator = new Validator(Schemas.selectionRule);
	$: errors = validator.validate(ruleConfig);
</script>

{#if ruleConfig}
	<Collapsable>
		<h4 slot="title">
			{#if title}{title}{:else}Rule{/if}
		</h4>
		<select bind:value={ruleConfig.op} label="selection operator">
			{#each ALL_SELECTION_OPERATORS as op}
				<option value={op}>{op}</option>
			{/each}
		</select>

		<select bind:value={ruleConfig.location} label="selection location">
			{#each ALL_SELECTION_LOCATIONS as loc}
				<option value={loc}>{loc}</option>
			{/each}
		</select>

		<ValidatedTextField
			bind:value={ruleConfig.value}
			label="selector value"
			errors={errors?.value}
		/>

		<Collapsable>
			<h4 slot="title">Nested rule</h4>
			<Toggled bind:value={ruleConfig.nestedRule} empty={DEFAULT_EMPTY_SELECTION_RULE}>
				<svelte:self bind:ruleConfig={ruleConfig.nestedRule} />
			</Toggled>
		</Collapsable>
	</Collapsable>
{/if}

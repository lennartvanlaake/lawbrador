<script lang="ts">
	import { Schemas } from '@lawbrador/shared';
	import type { ValueWithDisplayName } from '@lawbrador/shared';
	import Removable from '../common/Removable.svelte';
	export let option: ValueWithDisplayName;
	export let options: ValueWithDisplayName[] | undefined;
	import { Validator } from '$lib/ts/validate';
	import ValidatedTextField from '../common/ValidatedTextField.svelte';
	const validator = new Validator(Schemas.valueWithDisplayName);
	$: errors = validator.validate(option);
</script>

{#if option}
	<section>
		<Removable bind:value={option} bind:list={options}>
			<ValidatedTextField bind:value={option.value} errors={errors?.value} label="value" />
			<input type="textfield" bind:value={option.displayName} label="display name" />
		</Removable>
	</section>
{/if}

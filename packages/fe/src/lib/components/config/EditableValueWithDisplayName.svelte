<script lang="ts">
	import { Schemas } from '@lawbrador/shared';
	import type { ValueWithDisplayName } from '@lawbrador/shared';
	import Removable from '../common/Removable.svelte';
	import TextField from '@smui/textfield';
	export let option: ValueWithDisplayName;
	export let options: ValueWithDisplayName[];
	import { Validator } from '$lib/ts/validate';
	import ValidatedTextField from '../common/ValidatedTextField.svelte';
import Paper from '@smui/paper/src/Paper.svelte';
import { Content } from '@smui/paper';
	const validator = new Validator(Schemas.valueWithDisplayName);
	$: errors = validator.validate(option);
</script>
<Paper  square variant="unelevated">
	<Content>
	<Removable bind:value={option} bind:list={options}>
		<ValidatedTextField bind:value={option.value} errors={errors?.value} label="value" />
		<TextField input$emptyValueUndefined bind:value={option.displayName} label="display name" />
	</Removable>
	</Content>
</Paper>

<script lang="ts">
import type { SelectionRule } from "@lawbrador/shared/src/schemas/rules";
import { selectionRule } from "@lawbrador/shared/src/schemas/rules";
import { ALL_SELECTION_OPERATORS, ALL_SELECTION_LOCATIONS } from "@lawbrador/shared/src/schemas/rules";
import Select, { Option } from '@smui/select';
import TextField from '@smui/textfield';
import { createEventDispatcher } from "svelte";
import ValidatedForm from "../common/ValidatedForm.svelte";

export let ruleConfig: SelectionRule | undefined; 
export let title: string | null;
$: console.log(ruleConfig);
</script>
<ValidatedForm value={ruleConfig} schema={selectionRule} {title} let:errors={errors} let:isValid={isValid}>

<Select bind:value={ruleConfig.op} label="Selection operator">
{#each ALL_SELECTION_OPERATORS as op }
	<Option value={op}>{op}</Option>
{/each}
</Select>

<Select bind:value={ruleConfig.location} label="Selection location">
{#each ALL_SELECTION_LOCATIONS as loc }
	<Option value={loc}>{loc}</Option>
{/each}
</Select>

<TextField bind:value={ruleConfig.value} label="Selector value" required={true} />
	{@debug errors }
	{@debug isValid }
</ValidatedForm>

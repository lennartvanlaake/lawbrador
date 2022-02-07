<script lang="ts">
import { Validator } from "$lib/ts/validate";
import ValidatedTextField  from "$lib/components/common/ValidatedTextField.svelte";
import type { SelectionRule } from "@lawbrador/shared/src/schemas/rules";
import { selectionRule } from "@lawbrador/shared/src/schemas/rules";
import { ALL_SELECTION_OPERATORS, ALL_SELECTION_LOCATIONS } from "@lawbrador/shared/src/schemas/rules";
import Select, { Option } from '@smui/select';
export let ruleConfig: SelectionRule | undefined; 
export let title: string | null = null;
const validator = new Validator(selectionRule);
$: errors  = validator.validate(ruleConfig);
</script>
{#if ruleConfig }

{#if title }
	<h3>{ title }</h3>
{/if }
<div class="columns margins">
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
<ValidatedTextField bind:value={ruleConfig.value} label="Selector value" errors={errors?.value}>
</ValidatedTextField>
</div>

{/if }

<script lang="ts">
import type { SelectionRule } from "@lawbrador/shared/src/schemas/rules";
import { ALL_SELECTION_OPERATORS, ALL_SELECTION_LOCATIONS } from "@lawbrador/shared/src/schemas/rules";
import Select, { Option } from '@smui/select';
import TextField from '@smui/textfield';
export let ruleConfig: SelectionRule | undefined; 
export let title: string | null;
</script>
{#if title } 
<h3>{title}</h3>
{/if }

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

<TextField bind:value={ruleConfig.value} label="Selector value" />

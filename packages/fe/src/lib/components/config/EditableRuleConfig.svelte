<script lang="ts">
import type { SelectionRule } from "@lawbrador/shared/src/schemas/rules";
import { ALL_SELECTION_OPERATORS, ALL_SELECTION_LOCATIONS } from "@lawbrador/shared/src/schemas/rules";
import Select, { Option } from '@smui/select';
import TextField from '@smui/textfield';
import Button, { Label } from '@smui/button';

export let ruleConfig: SelectionRule | undefined; 
export let title: string;
export let optional: boolean;
const DEFAULT_EMPTY_CONFIG: SelectionRule = {
			op: "is",
			location: "id",
			value: ""
		}
</script>

<h3>{title}</h3>
{#if ruleConfig }

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
{#if optional }
<Button on:click={() => ruleConfig = undefined}>
	<Label>Remove</Label>
</Button>
{/if }

{:else }
	<Button on:click={() => ruleConfig = { ...DEFAULT_EMPTY_CONFIG } }>
	<Label>Add</Label>
</Button>
{/if }

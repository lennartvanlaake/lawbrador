<script lang="ts">
import type { SelectionRule } from "@lawbrador/shared/src/schemas/rules";
import { ALL_SELECTION_OPERATORS, ALL_SELECTION_LOCATIONS } from "@lawbrador/shared/src/schemas/rules";
import { DEFAULT_EMPTY_CONFIG } from "@lawbrador/shared/src/examples";
 
import Select, { Option } from '@smui/select';
import TextField from '@smui/textfield';
import Button, { Label } from '@smui/button';
import AddButton from "$lib/components/common/AddButton.svelte";
import RemoveButton from "$lib/components/common/RemoveButton.svelte";

export let ruleList: Array<SelectionRule> | null = null;
export let ruleConfig: SelectionRule | undefined; 
export let title: string | null;
export let optional: Boolean;
</script>
{#if title } 
<h3>{title}</h3>
{/if }
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
	<RemoveButton bind:toRemove={ruleConfig} bind:list={ruleList}/>
{/if }

{:else }
<AddButton bind:toAdd={ruleConfig} empty={DEFAULT_EMPTY_CONFIG} />
{/if }

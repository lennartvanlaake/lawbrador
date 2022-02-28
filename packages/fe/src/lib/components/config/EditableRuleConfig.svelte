<script lang="ts">
import { Validator } from "$lib/ts/validate";
import ValidatedTextField  from "$lib/components/common/ValidatedTextField.svelte";
import type { SelectionRule } from "@lawbrador/shared";
import { Schemas, ALL_SELECTION_OPERATORS, ALL_SELECTION_LOCATIONS  } from "@lawbrador/shared";
export let ruleConfig: SelectionRule | undefined; 
export let title: string | null = null;
const validator = new Validator(Schemas.selectionRule);
$: errors  = validator.validate(ruleConfig);
</script>
{#if ruleConfig }

{#if title }
<h4>{ title }</h4>
{/if }
<div class="columns margins">
<select bind:value={ruleConfig.op} label="selection operator">
{#each ALL_SELECTION_OPERATORS as op }
	<option value={op}>{op}</option>
{/each}
</select>

<select bind:value={ruleConfig.location} label="selection location">
{#each ALL_SELECTION_LOCATIONS as loc }
	<option value={loc}>{loc}</option>
{/each}
</select>
<ValidatedTextField bind:value={ruleConfig.value} label="selector value" errors={errors?.value}>
</ValidatedTextField>
</div>

{/if }

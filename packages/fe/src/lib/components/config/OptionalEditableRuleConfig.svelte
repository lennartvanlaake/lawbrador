<script lang="ts">
import type { SelectionRule } from "@lawbrador/shared/src/schemas/rules";
import OptionalValue from "../common/OptionalValue.svelte";
import EditableRuleConfig from "./EditableRuleConfig.svelte";
import { DEFAULT_EMPTY_SELECTION_RULE } from "@lawbrador/shared/src/examples";
export let ruleList: Array<SelectionRule> | null = null;
export let ruleConfig: SelectionRule | undefined; 
export let empty: SelectionRule = DEFAULT_EMPTY_SELECTION_RULE;
export let title: string | null;
$: if (!ruleConfig) ruleConfig = undefined;
console.log(ruleConfig);
</script>
{#if title }
<OptionalValue bind:value={ruleConfig} bind:list={ruleList} empty={empty}>
	<h3 slot="title">{title}</h3>
	<EditableRuleConfig bind:ruleConfig />
</OptionalValue>
{:else }
<OptionalValue bind:value={ruleConfig} bind:list={ruleList} empty={empty}>
	<EditableRuleConfig bind:ruleConfig />
</OptionalValue>
{/if }

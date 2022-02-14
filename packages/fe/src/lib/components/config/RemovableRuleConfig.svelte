<script lang="ts">
import type { SelectionRule } from "@lawbrador/shared";
import Removable from "../common/Removable.svelte";
import EditableRuleConfig from "./EditableRuleConfig.svelte";
export let list: Array<SelectionRule> | null = null;
export let ruleConfig: SelectionRule | undefined; 
export let title: string | null = null;
$: if (!ruleConfig) ruleConfig = undefined;
console.log(ruleConfig);
</script>
{#if ruleConfig }
<Removable bind:value={ruleConfig} bind:list >
	<EditableRuleConfig title={title} bind:ruleConfig />
</Removable>
{/if }

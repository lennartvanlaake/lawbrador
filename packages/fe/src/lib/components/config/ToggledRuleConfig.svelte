
<script lang="ts">
import type { SelectionRule } from "@lawbrador/shared/src/schemas/rules";
import { DEFAULT_EMPTY_SELECTION_RULE } from '@lawbrador/shared/src/examples';
import Toggled from "../common/Toggled.svelte";
import EditableRuleConfig from "./EditableRuleConfig.svelte";
export let ruleConfig: SelectionRule | undefined; 
export let title: string | null = null;
$: if (!ruleConfig) ruleConfig = undefined;
console.log(ruleConfig);
</script>
<Toggled bind:value={ruleConfig} empty={ DEFAULT_EMPTY_SELECTION_RULE} >
	<h3 slot="title">{title}</h3>
	<EditableRuleConfig bind:ruleConfig />
</Toggled>

<script lang="ts">
import type { MarkupRule } from "@lawbrador/shared";
import { ALL_MARKUP_NOTATIONS } from '@lawbrador/shared';
import EditableRuleConfig from "./EditableRuleConfig.svelte";
import Select, { Option } from '@smui/select';
export let rule: MarkupRule
</script>

<Select bind:value={rule.tag} label="Tag name">
{#each ALL_MARKUP_NOTATIONS as tag }
	<Option value={tag}>{tag}</Option>
{/each}
</Select>
<EditableRuleConfig title="Filter" bind:ruleConfig={rule.filter} />

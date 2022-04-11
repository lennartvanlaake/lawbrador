<script lang="ts">
	import type { MarkupRule } from '@lawbrador/shared';
	import { ALL_MARKUP_NOTATIONS } from '@lawbrador/shared';
	import Collapsable from '../common/Collapsable.svelte';
	import EditableRuleConfig from './EditableRuleConfig.svelte';
	export let rule: MarkupRule;
</script>

<select bind:value={rule.tag} label="Tag name">
	{#each ALL_MARKUP_NOTATIONS as tag}
		<option value={tag}>{tag}</option>
	{/each}
</select>
<Collapsable>
	<h4 slot="title">Filter</h4>
	<EditableRuleConfig bind:ruleConfig={rule.filter} />
</Collapsable>

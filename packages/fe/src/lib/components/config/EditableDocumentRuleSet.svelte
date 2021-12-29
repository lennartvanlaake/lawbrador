<script lang="ts">
import OptionalEditableRuleConfig from './OptionalEditableRuleConfig.svelte'
import Paper, { Title, Content } from '@smui/paper';
import type { DocumentRuleSet } from "@lawbrador/shared/src/schemas/rules";
import { DEFAULT_EMPTY_SELECTION_RULE } from "@lawbrador/shared/src/examples"
import AddButton from '../common/AddButton.svelte';
import RemoveButton from '../common/RemoveButton.svelte';
export let ruleSet: DocumentRuleSet | null;
export let ruleSetList: Array<DocumentRuleSet> | null = null;
let ruleSetConditions = ruleSet.conditionRules;
</script>
{#if ruleSet }
<Paper>
	<Content>
<OptionalEditableRuleConfig title="Body rule" bind:ruleConfig={ruleSet.bodyRule} /> 
<Paper>
	<Title>Condition rules</Title>
	{#each ruleSet.conditionRules as rule }
		<OptionalEditableRuleConfig bind:ruleConfig={rule} bind:ruleList={ruleSetConditions}  /> 
	{/each}
	<Content>
	<AddButton bind:value={ruleSet.conditionRules} empty={DEFAULT_EMPTY_SELECTION_RULE} />
	</Content>
</Paper>
	</Content>
	<RemoveButton bind:value={ruleSet} bind:list={ruleSetList}  />
</Paper>
{/if }

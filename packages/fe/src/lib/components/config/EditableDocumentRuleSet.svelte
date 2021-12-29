<script lang="ts">
import EditableRuleConfig from './EditableRuleConfig.svelte'
import Paper, { Title, Content } from '@smui/paper';
import type { DocumentRuleSet } from "@lawbrador/shared/src/schemas/rules";
import { DEFAULT_EMPTY_CONFIG } from "@lawbrador/shared/src/examples"
import AddButton from '../common/AddButton.svelte';
import RemoveButton from '../common/RemoveButton.svelte';
export let ruleSet: DocumentRuleSet;
export let ruleSetList: Array<DocumentRuleSet> | null = null;
</script>
<Paper>
	<Content>
<EditableRuleConfig title="Body rule" bind:ruleConfig={ruleSet.bodyRule} optional={true} /> 
<Paper>
	<Title>Condition rules</Title>
	{#each ruleSet.conditionRules as rule }
		<EditableRuleConfig bind:ruleConfig={rule} bind:ruleList={ruleSet.conditionRules} optional={true} /> 
	{/each}
	<Content>
	<AddButton bind:toAdd={ruleSet.conditionRules} empty={DEFAULT_EMPTY_CONFIG} />
	</Content>
</Paper>
	</Content>
	<RemoveButton bind:toRemove={ruleSet} bind:list={ruleSetList}  />
</Paper>

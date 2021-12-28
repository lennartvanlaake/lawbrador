<script lang="ts">
import TextField from '@smui/textfield';
import EditableRuleConfig from './EditableRuleConfig.svelte'
import Paper, { Title, Content } from '@smui/paper';
import type { DocumentRuleSet } from "@lawbrador/shared/src/schemas/rules";
import Button, { Label } from '@smui/button';
import { DEFAULT_EMPTY_CONFIG } from "@lawbrador/shared/src/examples"
export let ruleSet: DocumentRuleSet;
$: ruleSet.conditionRules = ruleSet.conditionRules.filter(r => r);
export let title: string;
</script>


<TextField label="Id" disabled value={ruleSet.id} />
<EditableRuleConfig title="Body rule" bind:ruleConfig={ruleSet.bodyRule} optional={true} /> 
<Paper>
	<Title>Condition rules</Title>
	{#each ruleSet.conditionRules as rule }
		<EditableRuleConfig bind:ruleConfig={rule} optional={true} /> 
	{/each}
	<Button on:click={() => ruleSet.conditionRules = [ ...ruleSet.conditionRules, { ...DEFAULT_EMPTY_CONFIG } ]}>
		<Label>Add</Label>
	</Button>
</Paper>

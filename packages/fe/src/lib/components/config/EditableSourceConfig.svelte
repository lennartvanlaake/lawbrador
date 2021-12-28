<script lang="ts">
import Button, { Label } from '@smui/button';
import type { SourceSiteConfig } from "@lawbrador/shared/src/schemas/rules";
import TextField from '@smui/textfield';
import EditableRuleConfig from './EditableRuleConfig.svelte'
import EditableDocumentRuleSet from './EditableDocumentRuleSet.svelte'
import Paper, { Title, Content } from '@smui/paper';
export let sourceConfig: SourceSiteConfig;
import { newEmptyRuleSet } from "@lawbrador/shared/src/examples";
</script>

<Paper>
	<Title>General</Title>
	<Content>
	<TextField label="Id" disabled value={sourceConfig.id} />
	<TextField label="Name" bind:value={sourceConfig.name} />
	</Content>
</Paper>

<Paper>
	<Title>Search</Title>
	<Content>
<TextField label="Query variable" bind:value={sourceConfig.htmlSearchRuleSet.queryVariable} />
<TextField label="Page variable" bind:value={sourceConfig.htmlSearchRuleSet.pageVariable} />
<EditableRuleConfig bind:ruleConfig={sourceConfig.htmlSearchRuleSet.resultListRule} title="Result list rule" /> 
<EditableRuleConfig bind:ruleConfig={sourceConfig.htmlSearchRuleSet.resultLinkRule} title="Result link rule" /> 
<EditableRuleConfig bind:ruleConfig={sourceConfig.htmlSearchRuleSet.resultRule} title="Result rule" /> 
	<EditableRuleConfig bind:ruleConfig={sourceConfig.htmlSearchRuleSet.resultDescriptionRule} title="Result description rule" optional={true} /> 
	</Content>
</Paper>

<Paper>
	<Title>Document rule sets</Title>
	<Content>
	{#each sourceConfig.documentRuleSets as ruleSet }
		{#if ruleSet }
			<EditableDocumentRuleSet bind:ruleSet={ruleSet} />		
		{/if }
	{/each}
	</Content>
	<Button on:click={() => sourceConfig.documentRuleSets = [ ...sourceConfig.documentRuleSets, newEmptyRuleSet()]}>
		<Label>Add</Label>
	</Button>
</Paper>



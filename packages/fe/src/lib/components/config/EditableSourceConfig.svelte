<script lang="ts">
import type { SourceSiteConfig } from "@lawbrador/shared/src/schemas/rules";
import TextField from '@smui/textfield';
import EditableRuleConfig from './EditableRuleConfig.svelte'
import OptionalEditableRuleConfig from './OptionalEditableRuleConfig.svelte'
import EditableDocumentRuleSet from './EditableDocumentRuleSet.svelte'
import Paper, { Title, Content } from '@smui/paper';
import {DEFAULT_EMPTY_RULESET} from "@lawbrador/shared/src/examples";
import AddButton from '../common/AddButton.svelte';

export let sourceConfig: SourceSiteConfig;
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
		<OptionalEditableRuleConfig bind:ruleConfig={sourceConfig.htmlSearchRuleSet.resultDescriptionRule} title="Result description rule"/>
	</Content>
</Paper>

<Paper>
	<Title>Document rule sets</Title>
	<Content>
	{#each sourceConfig.documentRuleSets as ruleSet }
		<EditableDocumentRuleSet bind:ruleSet={ruleSet} bind:ruleSetList={sourceConfig.documentRuleSets} />		
	{/each}
	<AddButton bind:value={sourceConfig.documentRuleSets} empty={DEFAULT_EMPTY_RULESET} />
	</Content>
</Paper>



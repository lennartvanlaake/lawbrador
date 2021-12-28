<script lang="ts">
import type { SourceSiteConfig } from "@lawbrador/shared/src/schemas/rules";
import TextField from '@smui/textfield';
import EditableRuleConfig from './EditableRuleConfig.svelte'
export let sourceConfig: SourceSiteConfig;

</script>

<p>Id: { sourceConfig.id }</p>
<TextField label="Name" bind:value={sourceConfig.name} />

<h2>Search config</h2> 
<TextField label="Query variable" bind:value={sourceConfig.htmlSearchRuleSet.queryVariable} />
<TextField label="Page variable" bind:value={sourceConfig.htmlSearchRuleSet.pageVariable} />
<EditableRuleConfig bind:ruleConfig={sourceConfig.htmlSearchRuleSet.resultListRule} title="Result list rule" /> 
<EditableRuleConfig bind:ruleConfig={sourceConfig.htmlSearchRuleSet.resultLinkRule} title="Result link rule" /> 
<EditableRuleConfig bind:ruleConfig={sourceConfig.htmlSearchRuleSet.resultRule} title="Result rule" /> 
<EditableRuleConfig bind:ruleConfig={sourceConfig.htmlSearchRuleSet.resultDescriptionRule} title="Result description rule" optional=true /> 

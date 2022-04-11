<script lang="ts">
	import type { HtmlSearchRuleSet } from '@lawbrador/shared';
	import EditableRuleConfig from './EditableRuleConfig.svelte';
	import ToggledRuleConfig from './ToggledRuleConfig.svelte';
	export let config: HtmlSearchRuleSet;
</script>

<EditableRuleConfig bind:ruleConfig={config.resultListRule} title="Result list rule" />
<ToggledRuleConfig bind:ruleConfig={config.resultLinkRule} title="Result link rule" />

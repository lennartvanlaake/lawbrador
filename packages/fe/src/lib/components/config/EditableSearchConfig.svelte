<script lang="ts">
	import type { HtmlSearchRuleSet } from '@lawbrador/shared';
	import EditableRuleConfig from './EditableRuleConfig.svelte';
	import ToggledRuleConfig from './ToggledRuleConfig.svelte';
	import { Validator } from '$lib/ts/validate';
	import { Schemas } from '@lawbrador/shared';
	export let config: HtmlSearchRuleSet;
	const validator = new Validator(Schemas.htmlSearchRuleSet);
	$: errors = validator.validate(config);
</script>

<EditableRuleConfig bind:ruleConfig={config.resultListRule} title="Result list rule" />
<ToggledRuleConfig bind:ruleConfig={config.resultLinkRule} title="Result link rule" />

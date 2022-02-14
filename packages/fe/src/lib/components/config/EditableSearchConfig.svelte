<script lang="ts">
	import type { HtmlSearchRuleSet } from '@lawbrador/shared';
	import ValidatedTextField from '../common/ValidatedTextField.svelte';
	import EditableRuleConfig from './EditableRuleConfig.svelte';
	import ToggledRuleConfig from './ToggledRuleConfig.svelte';
	import { Validator } from '$lib/ts/validate';
	import { Schemas } from '@lawbrador/shared';
	export let config: HtmlSearchRuleSet;
	const validator = new Validator(Schemas.htmlSearchRuleSet);
	$: errors = validator.validate(config);
</script>

<ValidatedTextField
	label="Query variable"
	bind:value={config.queryVariable}
	errors={errors?.queryVariable}
/>
<ValidatedTextField
	label="Page variable"
	bind:value={config.pageVariable}
	errors={errors?.pageVariable}
/>
<EditableRuleConfig bind:ruleConfig={config.resultListRule} title="Result list rule" />
<ToggledRuleConfig bind:ruleConfig={config.resultLinkRule} title="Result link rule" />

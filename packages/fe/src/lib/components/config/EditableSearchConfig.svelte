<script lang="ts">
	import type { HtmlSearchRuleSet } from '@lawbrador/shared/src/schemas/rules';
	import ValidatedTextField from '../common/ValidatedTextField.svelte';
	import EditableRuleConfig from './EditableRuleConfig.svelte';
	import ToggledRuleConfig from './ToggledRuleConfig.svelte';
	import { Validator } from '$lib/ts/validate';
	import { htmlSearchRuleSet as schema } from '@lawbrador/shared/src/schemas/rules';
	export let config: HtmlSearchRuleSet;
	const validator = new Validator(schema);
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
<EditableRuleConfig bind:ruleConfig={config.resultLinkRule} title="Result link rule" />
<EditableRuleConfig bind:ruleConfig={config.resultRule} title="Result rule" />
<ToggledRuleConfig bind:ruleConfig={config.resultDescriptionRule} title="Result description rule" />

<script lang="ts">
	import type { HtmlSearchRuleSet } from '@lawbrador/shared/src/schemas/rules';
	import ValidatedTextField from '../common/ValidatedTextField.svelte';
	import EditableRuleConfig from './EditableRuleConfig.svelte';
	import { Validator } from '$lib/ts/validate';
	import { htmlSearchRuleSet as schema } from '@lawbrador/shared/src/schemas/rules';
import Toggled from '../common/Toggled.svelte';
import { DEFAULT_EMPTY_SELECTION_RULE } from '@lawbrador/shared/src/examples';

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
<Toggled bind:value={config.resultDescriptionRule} empty={DEFAULT_EMPTY_SELECTION_RULE} >
<EditableRuleConfig
	bind:ruleConfig={config.resultDescriptionRule}
	title="Result description rule"
	/>
</Toggled>

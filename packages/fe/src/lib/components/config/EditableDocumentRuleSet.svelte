<script lang="ts">
	import RemovableRuleConfig from './RemovableRuleConfig.svelte';
	import ToggledRuleConfig from './ToggledRuleConfig.svelte';
	import type { DocumentRuleSet } from '@lawbrador/shared';
	import { DEFAULT_EMPTY_SELECTION_RULE, EMPTY_MARKUP_RULE, Schemas } from '@lawbrador/shared';
	import { Validator } from '$lib/ts/validate';
	import ValidatedList from '$lib/components/common/ValidatedList.svelte';
	import Toggled from '../common/Toggled.svelte';
	import EditableMarkupRule from './EditableMarkupRule.svelte';
	import Removable from '../common/Removable.svelte';
	export let ruleSet: DocumentRuleSet;
	const validator = new Validator(Schemas.documentRuleSet);
	$: errors = validator.validate(ruleSet);
</script>
<section>
	<ToggledRuleConfig bind:ruleConfig={ruleSet.bodyRule} title="Body rule" />
	<section>
		<h3>Condition rules</h3>
		<Toggled empty={[DEFAULT_EMPTY_SELECTION_RULE]} bind:value={ruleSet.conditionRules}>
			<ValidatedList bind:list={ruleSet.conditionRules} errors={errors?.conditionRules} empty={DEFAULT_EMPTY_SELECTION_RULE}>
				{#each ruleSet.conditionRules ?? [] as rule}
				<RemovableRuleConfig bind:ruleConfig={rule} bind:list={ruleSet.conditionRules}/>
				{/each}
			</ValidatedList>
		</Toggled>
	</section>
	<section>
	<h3>Markup rules</h3>
	<Toggled empty={[EMPTY_MARKUP_RULE]} bind:value={ruleSet.markupRules}>
		<ValidatedList bind:list={ruleSet.markupRules} errors={errors?.markupRules} empty={EMPTY_MARKUP_RULE}>
		{#each ruleSet.markupRules ?? [] as rule}
			<section>
			<Removable bind:value={rule} bind:list={ruleSet.markupRules}>
			<EditableMarkupRule
				bind:rule={rule}
			/>
			</Removable>
			</section>
		{/each}
		</ValidatedList>
	</Toggled>
	</section>
</section> 

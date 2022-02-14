<script lang="ts">
	import RemovableRuleConfig from './RemovableRuleConfig.svelte';
	import ToggledRuleConfig from './ToggledRuleConfig.svelte';
	import Paper, { Title, Content } from '@smui/paper';
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
<Paper>
	<Content>
	<ToggledRuleConfig bind:ruleConfig={ruleSet.bodyRule} title="Body rule" />
	<Paper>
		<Title>Condition rules</Title>
		<Content>
		<Toggled empty={[DEFAULT_EMPTY_SELECTION_RULE]} bind:value={ruleSet.conditionRules}>
			<ValidatedList bind:list={ruleSet.conditionRules} errors={errors?.conditionRules} empty={DEFAULT_EMPTY_SELECTION_RULE}>
				{#each ruleSet.conditionRules ?? [] as rule}
				<RemovableRuleConfig bind:ruleConfig={rule} bind:list={ruleSet.conditionRules}/>
				{/each}
			</ValidatedList>
		</Toggled>
		</Content>
	</Paper>
	<Paper>
	<Title>Markup rules</Title>
	<Toggled empty={[EMPTY_MARKUP_RULE]} bind:value={ruleSet.markupRules}>
		<ValidatedList bind:list={ruleSet.markupRules} errors={errors?.markupRules} empty={EMPTY_MARKUP_RULE}>
		{#each ruleSet.markupRules ?? [] as rule}
			<Paper>
			<Content>
			<Removable bind:value={rule} bind:list={ruleSet.markupRules}>
			<EditableMarkupRule
				bind:rule={rule}
			/>
			</Removable>
			</Content>
			</Paper>
		{/each}
		</ValidatedList>
	</Toggled>
	</Paper>
	</Content>
</Paper> 

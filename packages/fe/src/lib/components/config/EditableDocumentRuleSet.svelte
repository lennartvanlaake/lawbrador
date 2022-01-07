<script lang="ts">
	import OptionalEditableRuleConfig from './OptionalEditableRuleConfig.svelte';
	import Paper, { Title, Content } from '@smui/paper';
	import type { DocumentRuleSet } from '@lawbrador/shared/src/schemas/rules';
	import { documentRuleSet as schema } from '@lawbrador/shared/src/schemas/rules';
	import { DEFAULT_EMPTY_SELECTION_RULE } from '@lawbrador/shared/src/examples';
	import Button, { Label } from '@smui/button';
	import { Validator } from '$lib/ts/validate';
	import ValidatedList from '$lib/components/common/ValidatedList.svelte';
	
	export let ruleSet: DocumentRuleSet;
	export let ruleSetList: Array<DocumentRuleSet> | null = null;
	
	const ENABLE_TEXT = 'Enable';
	const DISABLE_TEXT = 'Disable';
	$: isConditionRulesEnabled = ruleSet.conditionRules;
	$: switchButtonText = isConditionRulesEnabled ? DISABLE_TEXT : ENABLE_TEXT;
	function switchConditionRulesEnabled() {
		if (ruleSet?.conditionRules) {
			ruleSet.conditionRules = undefined;
		} else {
			ruleSet.conditionRules = [ { ...DEFAULT_EMPTY_SELECTION_RULE } ];
		}
	}

	const validator = new Validator(schema);

	$: errors = validator.validate(ruleSet);
	$: console.log(errors);
</script>

	<Paper>
		<Content>
			<OptionalEditableRuleConfig title="Body rule" bind:ruleConfig={ruleSet.bodyRule} />
			<Paper>
				<Title>Condition rules</Title>
				<Button on:click={switchConditionRulesEnabled}>
					<Label>{switchButtonText}</Label>
				</Button>
				{#if isConditionRulesEnabled}
					<ValidatedList bind:list={ruleSet.conditionRules} errors={errors?.conditionRules} empty={DEFAULT_EMPTY_SELECTION_RULE}>
					{#each ruleSet.conditionRules ?? [] as rule}
						<OptionalEditableRuleConfig
							bind:ruleConfig={rule}
							bind:ruleList={ruleSet.conditionRules}
						/>
					{/each}
					</ValidatedList>
				{/if}
			</Paper>
		</Content>
	</Paper>

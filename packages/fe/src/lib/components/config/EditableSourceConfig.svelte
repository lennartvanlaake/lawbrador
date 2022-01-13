<script lang="ts">
	import { getImprovedErrorMessages, Validator } from '$lib/ts/validate';
	import ValidatedTextField from '$lib/components/common/ValidatedTextField.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
	import { unsavedSourceSiteConfig as schema } from '@lawbrador/shared/src/schemas/rules';
	import EditableDocumentRuleSet from './EditableDocumentRuleSet.svelte';
	import Paper, { Title, Content } from '@smui/paper';
	import { DEFAULT_EMPTY_RULESET } from '@lawbrador/shared/src/examples';
	import AddButton from '../common/AddButton.svelte';
	import EditableUrlConfig from './EditableUrlConfig.svelte';
	import EditableSearchConfig from './EditableSearchConfig.svelte';
	import WarningBox from '../common/WarningBox.svelte';

	export let sourceConfig: Omit<SourceSiteConfig, '_id'>;
	export let isValid: boolean = false;
	const validator = new Validator(schema);
	$: errors = validator.validate(sourceConfig);
	$: isValid = !errors;
	$: console.log(sourceConfig);
</script>

<Paper>
	<Title>General</Title>
	<Content>
		<ValidatedTextField label="Name" bind:value={sourceConfig.name} errors={errors?.name} />
	</Content>
</Paper>

<Paper>
	<Title>Search</Title>
	<Content>
		<EditableSearchConfig bind:config={sourceConfig.htmlSearchRuleSet} />
	</Content>
</Paper>

<Paper>
	<Title>Document rule sets</Title>
		<Content>
		{#each sourceConfig.documentRuleSets ?? [] as ruleSet}
			<EditableDocumentRuleSet bind:ruleSet bind:ruleSetList={sourceConfig.documentRuleSets} />
		{/each}
		<AddButton bind:value={sourceConfig.documentRuleSets} empty={DEFAULT_EMPTY_RULESET} />
	</Content>
</Paper>

<Paper>
	<Title>Search url config</Title>
	<Content>
		<EditableUrlConfig bind:urlConfig={sourceConfig.searchUrlConfig} />
	</Content>
</Paper>

<Paper>
	<Title>Document url config</Title>
	<Content>
		<EditableUrlConfig bind:urlConfig={sourceConfig.documentUrlConfig} />
	</Content>
</Paper>

<WarningBox messages={getImprovedErrorMessages(errors?.all)} />

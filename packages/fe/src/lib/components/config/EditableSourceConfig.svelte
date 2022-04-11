<script lang="ts">
	import { getImprovedErrorMessages, Validator } from '$lib/ts/validate';
	import ValidatedTextField from '$lib/components/common/ValidatedTextField.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared';
	import { Schemas } from '@lawbrador/shared';
	import EditableDocumentRuleSet from './EditableDocumentRuleSet.svelte';
	import EditableSearchUrlConfig from './EditableSearchUrlConfig.svelte';
	import { DEFAULT_EMPTY_RULESET } from '@lawbrador/shared';
	import AddButton from '../common/AddButton.svelte';
	import EditableUrlConfig from './EditableUrlConfig.svelte';
	import EditableSearchConfig from './EditableSearchConfig.svelte';
	import WarningBox from '../common/WarningBox.svelte';
	import Removable from '../common/Removable.svelte';
	import Collapsable from '../common/Collapsable.svelte';

	export let sourceConfig: Omit<SourceSiteConfig, '_id'>;
	export let isValid = false;
	const validator = new Validator(Schemas.unsavedSourceSiteConfig);
	$: errors = validator.validate(sourceConfig);
	$: isValid = !errors;
	$: console.log(sourceConfig);
</script>

<Collapsable>
	<h2 slot="title">General</h2>
	<ValidatedTextField label="Name" bind:value={sourceConfig.name} errors={errors?.name} />
	<h4>Description</h4>
	<textarea bind:value={sourceConfig.description} />
</Collapsable>

<Collapsable>
	<h2 slot="title">Search</h2>
	<EditableSearchConfig bind:config={sourceConfig.htmlSearchRuleSet} />
</Collapsable>

<Collapsable>
	<h2 slot="title">Document rule sets</h2>
	{#each sourceConfig.documentRuleSets ?? [] as ruleSet}
		<Removable bind:value={ruleSet} bind:list={sourceConfig.documentRuleSets}>
			<EditableDocumentRuleSet bind:ruleSet />
		</Removable>
	{/each}
	<div>
		<AddButton bind:value={sourceConfig.documentRuleSets} empty={DEFAULT_EMPTY_RULESET} />
	</div>
</Collapsable>

<Collapsable>
	<h2 slot="title">Search url config</h2>
	<EditableSearchUrlConfig bind:config={sourceConfig.searchUrlConfig} />
</Collapsable>

<Collapsable>
	<h2 slot="title">Document url config</h2>
	<EditableUrlConfig bind:urlConfig={sourceConfig.documentUrlConfig} />
</Collapsable>

<WarningBox messages={getImprovedErrorMessages(errors?.all)} />

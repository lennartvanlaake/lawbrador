<script lang="ts">
	import { getImprovedErrorMessages, Validator } from '$lib/ts/validate';
	import ValidatedTextField from '$lib/components/common/ValidatedTextField.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared';
	import { Schemas } from '@lawbrador/shared';
	import EditableDocumentRuleSet from './EditableDocumentRuleSet.svelte';
	import { DEFAULT_EMPTY_RULESET } from '@lawbrador/shared';
	import AddButton from '../common/AddButton.svelte';
	import EditableUrlConfig from './EditableUrlConfig.svelte';
	import EditableSearchConfig from './EditableSearchConfig.svelte';
	import WarningBox from '../common/WarningBox.svelte';
import Removable from '../common/Removable.svelte';

	export let sourceConfig: Omit<SourceSiteConfig, '_id'>;
	export let isValid = false;
	const validator = new Validator(Schemas.unsavedSourceSiteConfig);
	$: errors = validator.validate(sourceConfig);
	$: isValid = !errors;
	$: console.log(sourceConfig);
</script>

<section>
	<h2>General</h2>
		<ValidatedTextField label="Name" bind:value={sourceConfig.name} errors={errors?.name} />
</section>

<section>
	<h2>Search</h2>
		<EditableSearchConfig bind:config={sourceConfig.htmlSearchRuleSet} />
</section>

<section>
	<h2>Document rule sets</h2>
		{#each sourceConfig.documentRuleSets ?? [] as ruleSet}
		<Removable bind:value={ruleSet} bind:list={sourceConfig.documentRuleSets}>
			<EditableDocumentRuleSet bind:ruleSet />
		</Removable>
		{/each}
		<div>
		<AddButton bind:value={sourceConfig.documentRuleSets} empty={DEFAULT_EMPTY_RULESET} />
		</div>
</section>

<section>
	<h2>Search url config</h2>
		<EditableUrlConfig bind:urlConfig={sourceConfig.searchUrlConfig} />
</section>

<section>
	<h2>Document url config</h2>
		<EditableUrlConfig bind:urlConfig={sourceConfig.documentUrlConfig} />
</section>

<WarningBox messages={getImprovedErrorMessages(errors?.all)} />

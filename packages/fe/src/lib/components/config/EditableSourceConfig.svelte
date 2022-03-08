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

<h2>General</h2>
<section>
		<h4>Name</h4>
		<ValidatedTextField label="Name" bind:value={sourceConfig.name} errors={errors?.name} />
		<h4>Description</h4>
		<textarea bind:value={sourceConfig.description}  />
</section>

<h2>Search</h2>
<section>
		<EditableSearchConfig bind:config={sourceConfig.htmlSearchRuleSet} />
</section>

<h2>Document rule sets</h2>
<section>
		{#each sourceConfig.documentRuleSets ?? [] as ruleSet}
		<Removable bind:value={ruleSet} bind:list={sourceConfig.documentRuleSets}>
			<EditableDocumentRuleSet bind:ruleSet />
		</Removable>
		{/each}
		<div>
		<AddButton bind:value={sourceConfig.documentRuleSets} empty={DEFAULT_EMPTY_RULESET} />
		</div>
</section>

<h2>Search url config</h2>
<section>
		<EditableUrlConfig bind:urlConfig={sourceConfig.searchUrlConfig} />
</section>

<h2>Document url config</h2>
<section>
		<EditableUrlConfig bind:urlConfig={sourceConfig.documentUrlConfig} />
</section>

<WarningBox messages={getImprovedErrorMessages(errors?.all)} />

<script lang="ts">
	import View from '$lib/components/workbench/View.svelte';
	import EditableDocumentRuleSet from '$lib/components/config/EditableDocumentRuleSet.svelte';
	import { DEFAULT_EMPTY_SELECTION_RULE, eurlexConfig } from '@lawbrador/shared';
	let eurlexFirst = eurlexConfig.documentRuleSets[0];
	const empty = {};
	let invalid = { conditionRules: [DEFAULT_EMPTY_SELECTION_RULE] };
</script>

<View name="Empty">
	<EditableDocumentRuleSet ruleSet={empty} />
</View>
<View name="Eurlex 1">
	<EditableDocumentRuleSet ruleSet={eurlexFirst} />
</View>
<View name="Invalid">
	<EditableDocumentRuleSet ruleSet={invalid} />
</View>

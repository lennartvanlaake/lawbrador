<script lang="ts">
	import EditableRuleConfig from '$lib/components/config/EditableRuleConfig.svelte';
	import View from '$lib/components/workbench/View.svelte';
	import { DEFAULT_EMPTY_SELECTION_RULE } from '@lawbrador/shared';
	const filled = { ...DEFAULT_EMPTY_SELECTION_RULE, value: 'bla' };
</script>

<View name="empty">
	<div>
		<EditableRuleConfig ruleConfig={DEFAULT_EMPTY_SELECTION_RULE} />
	</div>
</View>

<View name="filled">
	<div>
		<EditableRuleConfig ruleConfig={filled} />
	</div>
</View>

<style>
	div {
		height: 300px;
	}
</style>

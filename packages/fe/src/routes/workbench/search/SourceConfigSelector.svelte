<script lang="ts">
	import SourceConfigSelector from '$lib/components/search/SourceConfigSelector.svelte';
	import View from '$lib/components/workbench/View.svelte';
	import { eurlexConfig } from '@lawbrador/shared';
	const configList = [eurlexConfig];
</script>

<View name="empty">
	<div>
		<SourceConfigSelector sourceConfigList={[]} />
	</div>
</View>

<View name="filled">
	<div>
		<SourceConfigSelector sourceConfigList={configList} sourceConfigId={eurlexConfig._id} />
	</div>
</View>

<style>
	div {
		height: 300px;
	}
</style>

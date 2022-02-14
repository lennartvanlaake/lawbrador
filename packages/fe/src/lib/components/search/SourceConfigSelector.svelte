<script lang="ts">
	import type { SourceSiteConfig } from '@lawbrador/shared';
	import { createEventDispatcher } from 'svelte';
	import Select, { Option } from '@smui/select';
	export let sourceConfigList: SourceSiteConfig[];
	export let sourceConfig: SourceSiteConfig | null = null;
	export let sourceConfigId: string | null = null;
	const dispatch = createEventDispatcher<{"configSelected": SourceSiteConfig}>();
	const sourceConfigMap: Record<string, SourceSiteConfig> = sourceConfigList.reduce((map, conf) => {
		map[conf._id] = conf;
		return map;
	}, {});

	function selectSourceConfig(sourceConfigId: string | null) {
		sourceConfig = sourceConfigId ? sourceConfigMap[sourceConfigId] : sourceConfig;
		console.log(sourceConfig);
		if (sourceConfig) {
			dispatch("configSelected", sourceConfig);
		}
	}
	$: selectSourceConfig(sourceConfigId);
</script>
<div>
<Select bind:value={sourceConfigId}>
	{#each sourceConfigList as config}
		<Option value={config._id}>{config.name}</Option>
	{/each}
</Select>
</div>

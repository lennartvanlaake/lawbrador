<script lang="ts">
	import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
	import { createEventDispatcher } from 'svelte';
	import Select, { Option } from '@smui/select';
	export let sourceConfigList: SourceSiteConfig[];
	export let sourceConfig: SourceSiteConfig | null;
	export let sourceConfigId: string | null = null;
	const dispatch = createEventDispatcher<{"configSelected": SourceSiteConfig}>();
	const sourceConfigMap: Record<string, SourceSiteConfig> = sourceConfigList.reduce((map, conf) => {
		map[conf._id] = conf;
		return map;
	}, {});

	function selectSourceConfig(sourceConfigId: string | null) {
		sourceConfig = sourceConfigId ? sourceConfigMap[sourceConfigId] : null;
		if (sourceConfig) {
			dispatch("configSelected", sourceConfig);
		}
	}
	$: selectSourceConfig(sourceConfigId);
</script>

<Select bind:value={sourceConfigId}>
	{#each sourceConfigList as config}
		<Option value={config._id}>{config.name}</Option>
	{/each}
</Select>

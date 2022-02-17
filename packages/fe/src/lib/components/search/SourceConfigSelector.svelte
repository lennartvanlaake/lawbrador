<script lang="ts">
	import type { SourceSiteConfig } from '@lawbrador/shared';
	import { createEventDispatcher } from 'svelte';
	export let sourceConfigList: SourceSiteConfig[];
	export let sourceConfig: SourceSiteConfig | null = null;
	export let sourceConfigId: string | null = null;
	const dispatch = createEventDispatcher<{"configSelected": SourceSiteConfig}>();
	
	//@ts-ignore
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
<select bind:value={sourceConfigId}>
	{#each sourceConfigList as config}
		<option value={config._id}>{config.name}</option>
	{/each}
</select>
</div>

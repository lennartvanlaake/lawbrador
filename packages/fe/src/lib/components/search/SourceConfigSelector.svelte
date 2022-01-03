<script lang="ts">
	import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
	import { onMount } from 'svelte';
	import Select, { Option } from '@smui/select';
	export let sourceConfigList: SourceSiteConfig[];
	export let sourceConfig: SourceSiteConfig | null;
	export let sourceConfigId: string | null = null;
	const sourceConfigMap: Record<string, SourceSiteConfig> = sourceConfigList.reduce((map, conf) => {
		map[conf._id] = conf;
		return map;
	}, {});

	onMount(() => {
		if (sourceConfigId) {
			sourceConfig = sourceConfigMap[sourceConfigId];
		} else {
			sourceConfig = sourceConfigList[0];
			sourceConfigId = sourceConfig?._id;
		}
	});
	$: sourceConfig = sourceConfigMap[sourceConfigId];
	$: console.log(sourceConfig);
</script>

<Select bind:value={sourceConfigId}>
	{#each sourceConfigList as config}
		<Option value={config._id}>{config.name}</Option>
	{/each}
</Select>

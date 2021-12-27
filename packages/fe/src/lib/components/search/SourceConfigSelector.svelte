<script lang="ts">
	import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
	import { onMount } from 'svelte';
	export let sourceConfigList: SourceSiteConfig[];
	export let sourceConfig: SourceSiteConfig | null;
	export let sourceConfigId: string | null = null;
	const sourceConfigMap: Record<string, SourceSiteConfig> = sourceConfigList.reduce((map, conf) => {
		map[conf.id] = conf;
		return map;
	}, {});

	onMount(() => {
		if (sourceConfigId) {
			sourceConfig = sourceConfigMap[sourceConfigId];
		} else {
			sourceConfig = sourceConfigList[0];
			sourceConfigId = sourceConfig.id;
		}
	});
	$: sourceConfig = sourceConfigMap[sourceConfigId];
	$: console.log(sourceConfig);
</script>

<select bind:value={sourceConfigId}>
	{#each sourceConfigList as config}
		<option value={config.id}>{config.name}</option>
	{/each}
</select>

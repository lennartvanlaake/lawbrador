<script lang="ts"> 
	import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
	import SearchOptionInput from './SearchOptionInput.svelte';
	export let searchParams: Record<string, string>;
	export let sourceConfig: SourceSiteConfig;
	$: queryVariable = sourceConfig?.htmlSearchRuleSet.queryVariable;
	$: pageVariable = sourceConfig?.htmlSearchRuleSet.pageVariable;
	$: options = Object.values(sourceConfig?.searchUrlConfig.queryComponents ?? [])
		.filter((c) => !c.value && c.variableName != queryVariable && c.variableName != pageVariable)
</script>

{ #each options as option } 
	<SearchOptionInput option={option} bind:value={searchParams[option.variableName]} />
{ /each }




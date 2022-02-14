<script lang="ts">
	import type { SourceSiteConfig, VariableUrlComponent } from '@lawbrador/shared';
	import SearchOptionInput from './SearchOptionInput.svelte';
	export let searchParams: Record<string, string>;
	export let sourceConfig: SourceSiteConfig;
	$: queryVariable = sourceConfig?.htmlSearchRuleSet.queryVariable;
	$: pageVariable = sourceConfig?.htmlSearchRuleSet.pageVariable;
	$: options = sourceConfig?.searchUrlConfig?.queryComponents
		.filter(
			(c) =>  'variableName' in c.urlComponent && 
				c.urlComponent.variableName != pageVariable &&
				c.urlComponent.variableName != queryVariable
		).map(c => c.urlComponent as VariableUrlComponent);
	console.log(options);
</script>

{#each options ?? [] as option}
	<SearchOptionInput {option} bind:value={searchParams[option.variableName]} />
{/each}

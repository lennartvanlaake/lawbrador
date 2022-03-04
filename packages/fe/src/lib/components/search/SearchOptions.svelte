<script lang="ts">
	import type { QueryParam, SourceSiteConfig, VariableUrlComponent } from '@lawbrador/shared';
	import SearchOptionInput from './SearchOptionInput.svelte';
	export let searchParams: Record<string, string>;
	export let sourceConfig: SourceSiteConfig;
	$: queryVariable = sourceConfig?.htmlSearchRuleSet.queryVariable;
	$: pageVariable = sourceConfig?.htmlSearchRuleSet.pageVariable;
	$: queryComponents = sourceConfig?.searchUrlConfig?.queryComponents;
	$: options = queryComponents
		?.filter(
			(c) =>
				'variableName' in c.urlComponent &&
				c.urlComponent.variableName != pageVariable &&
				c.urlComponent.variableName != queryVariable
		)
		?.map((c) => c.urlComponent as VariableUrlComponent)
		?.filter((c) => dependentOptionsMatch(c));

	function dependentOptionsMatch(c: VariableUrlComponent): boolean {
		if (c.showIf) {
			const dependentVariable = queryComponents?.filter(
				(it) => 'variableName' in it.urlComponent && it.name == c.showIf!!.key
			)[0]?.urlComponent as VariableUrlComponent;
			if (dependentVariable && searchParams[dependentVariable.variableName] == c.showIf!!.value) {
				return true;
			}
			return false;
		}
		return true;
	}
	console.log(options);
</script>

{#each options ?? [] as option}
	<SearchOptionInput {option} bind:value={searchParams[option.variableName]} />
{/each}

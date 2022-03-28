<script lang="ts">
	import type { SourceSiteConfig, VariableUrlComponent } from '@lawbrador/shared';
	import { PAGE_VARIABLE_NAME, QUERY_VARIABLE_NAME } from '@lawbrador/shared/src/constants/other';
	import SearchOptionInput from './SearchOptionInput.svelte';
	export let searchParams: Record<string, string>;
	export let sourceConfig: SourceSiteConfig;
	let options: VariableUrlComponent[];
	$: options = getOptionsForConfig(sourceConfig);

	// ignore params, svelte makes sure they trigger calling this function on value change
	function getOptionsForConfig(_: SourceSiteConfig) {
		const queryComponents = sourceConfig?.searchUrlConfig?.queryComponents ?? [];
		return queryComponents
			.filter((c) => 'variableName' in c.urlComponent)
			.map((c) => c.urlComponent as VariableUrlComponent)
			.filter((c) => dependentOptionsMatch(c));
	}

	function onOptionValueChange() {
		console.debug('changed');
		options = getOptionsForConfig(sourceConfig) ?? [];
		const optionNames = [
			QUERY_VARIABLE_NAME,
			PAGE_VARIABLE_NAME,
			...options.map((it) => it.variableName)
		];
		searchParams = Object.fromEntries(
			Object.entries(searchParams).filter(([key]) => optionNames.includes(key))
		);
	}

	// remove options that are disable because of dependent options having the wrong value
	function dependentOptionsMatch(c: VariableUrlComponent): boolean {
		if (c.showIf) {
			const dependentVariable = sourceConfig.searchUrlConfig.queryComponents?.filter(
				(it) => 'variableName' in it.urlComponent && it.name == c.showIf!.key
			)[0]?.urlComponent as VariableUrlComponent;
			if (dependentVariable && searchParams[dependentVariable.variableName] == c.showIf!.value) {
				return true;
			}
			return false;
		}
		return true;
	}
</script>

{#each options ?? [] as option}
	<SearchOptionInput
		{option}
		bind:value={searchParams[option.variableName]}
		on:change={onOptionValueChange}
	/>
{/each}

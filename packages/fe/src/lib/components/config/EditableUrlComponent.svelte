<script lang="ts">
	import type { UrlComponent, VariableUrlComponent } from '@lawbrador/shared';
	import { Schemas } from '@lawbrador/shared';
	import { Validator } from '$lib/ts/validate';
	import ValidatedTextField from '$lib/components/common/ValidatedTextField.svelte';
	import ValidatedList from '$lib/components/common/ValidatedList.svelte';
	import { EMPTY_VALUE_WITH_DISPLAY_NAME } from '@lawbrador/shared';
	import EditableValueWithDisplayName from './EditableValueWithDisplayName.svelte';

	export let config: UrlComponent;

	const staticValidator = new Validator(Schemas.staticUrlComponent);
	const variableValidator = new Validator(Schemas.variableUrlComponent);

	const STATIC_TEXT = 'Make variable';
	const VARIABLE_TEXT = 'Make static';
	const ENABLE_TEXT = 'Enable';
	const DISABLE_TEXT = 'Disable';

	function isVariable(config: UrlComponent): config is VariableUrlComponent {
		return 'variableName' in config;
	}
	function switchVariable() {
		if (isVariable(config)) {
			config = { value: config.variableName };
		} else {
			config = { variableName: config.value };
		}
	}
	function switchPossibleValues() {
		config = config as VariableUrlComponent;
		if (config.possibleValues) {
			config.possibleValues = undefined;
		} else {
			config.possibleValues = [{ ...EMPTY_VALUE_WITH_DISPLAY_NAME }];
		}
	}

	$: buttonText = isVariable(config) ? VARIABLE_TEXT : STATIC_TEXT;
	$: isPossibleValuesEnabled = (config as VariableUrlComponent).possibleValues;
	$: possibleValuesText = isPossibleValuesEnabled ? DISABLE_TEXT : ENABLE_TEXT;
	$: validator = isVariable(config) ? variableValidator : staticValidator;
	$: errors = validator.validate(config);
</script>

{#if config}
	<section>
			{#if !isVariable(config)}
				<ValidatedTextField bind:value={config.value} errors={errors?.value} label="Static value" />
			{:else}
				<ValidatedTextField
					bind:value={config.variableName}
					errors={errors?.variableName}
					label="Variable name"
				/>
			{/if}
			<button on:click={switchVariable}>
				{buttonText}
			</button>
			{#if isVariable(config)}
				<h4>Options</h4>
				<button on:click={switchPossibleValues}>
					{possibleValuesText}
				</button>
				{#if isPossibleValuesEnabled}
					<ValidatedList
						bind:list={config.possibleValues}
						empty={EMPTY_VALUE_WITH_DISPLAY_NAME}
						errors={errors?.possibleValues}
					>
						{#each config.possibleValues ?? [] as option}
							<EditableValueWithDisplayName bind:option bind:options={config.possibleValues} />
						{/each}
					</ValidatedList>
				{/if}
			{/if}
	</section>
{/if}

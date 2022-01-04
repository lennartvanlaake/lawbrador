<script lang="ts">
import type {UrlComponent, VariableUrlComponent} from "@lawbrador/shared/src/schemas/rules";
import TextField from '@smui/textfield';
import Paper, { Content } from '@smui/paper';
import List, { Item } from '@smui/list';
import Button, { Label } from '@smui/button';
import OptionalValue from "../common/OptionalValue.svelte";
import { EMPTY_VALUE_WITH_DISPLAY_NAME } from "@lawbrador/shared/src/examples";
import AddButton from "../common/AddButton.svelte";
export let config: UrlComponent;
const STATIC_TEXT = "Make variable";
const VARIABLE_TEXT = "Make static";
const ENABLE_TEXT =  "Enable";
const DISABLE_TEXT = "Disable";
function isVariable(config: UrlComponent): config is VariableUrlComponent {
	return "variableName" in config;
}
function switchVariable() {
	if (isVariable(config)) {
		config = { value: config.variableName } 
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
</script>
{#if config }
<Paper>
	<Content>
	{#if !isVariable(config) }
		<TextField bind:value={config.value} label="Static value" required/>
	{:else }
		<TextField bind:value={config.variableName} label="Variable name" required/>
	{/if }
	<Button on:click={switchVariable}>
		<Label>{ buttonText }</Label>
	</Button> 	
	{#if isVariable(config) }
		<h3>Options</h3>
		<Button on:click={switchPossibleValues}>
			<Label>{ possibleValuesText }</Label>
		</Button> 	
		{#if isPossibleValuesEnabled }
		<List nonInteractive>
			{#each config.possibleValues as option }
			<Item>
			<OptionalValue bind:value={option} bind:list={config.possibleValues} >
				<TextField bind:value={option.value} label="value" required/>
				<TextField bind:value={option.displayName} label="display name"/>
			</OptionalValue>
			</Item>
		{/each }
		</List>
		<AddButton bind:value={config.possibleValues} empty={EMPTY_VALUE_WITH_DISPLAY_NAME} />
		{/if }	
	{/if }
	</Content>
</Paper>
{/if }

<script lang="ts">
import type { UrlComponent } from "@lawbrador/shared/src/schemas/rules";
import TextField from '@smui/textfield';
import Paper, { Title, Content } from '@smui/paper';
import List, { Item } from '@smui/list';
import OptionalTextField from "../common/OptionalTextField.svelte";
import OptionalValue from "../common/OptionalValue.svelte";
import { EMPTY_VALUE_WITH_DISPLAY_NAME } from "@lawbrador/shared/src/examples";
import AddButton from "../common/AddButton.svelte";
export let config: UrlComponent;
config.possibleValues = config.possibleValues ?? [];
config.value = config.value !== undefined ? config.value : null;
config.variableName = config.variableName !== undefined ? config.variableName : null;
let { possibleValues } = config; 
</script>
{#if config }
<Paper>
	<Content>
	<OptionalTextField bind:value={config.value} label="Static value" on:disabled={() => config.variableName="" }/>
	<OptionalTextField bind:value={config.variableName} label="Variable name" on:disabled={() => config.value="" }/>
	{#if config.variableName }
		<h3>Variable values</h3>
	<List nonInteractive>
		{#each possibleValues as option }
		<Item>
		<OptionalValue bind:value={option} bind:list={possibleValues} >
			<TextField bind:value={option.value} label="value"/>
			<TextField bind:value={option.displayName} label="display name"/>
		</OptionalValue>
		</Item>
	{/each }
	</List>
	<AddButton bind:value={possibleValues} empty={EMPTY_VALUE_WITH_DISPLAY_NAME} />
	{/if }
	</Content>
</Paper>
{/if }

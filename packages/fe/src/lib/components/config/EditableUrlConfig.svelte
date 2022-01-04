<script lang="ts">
import TextField from '@smui/textfield';
import type { UrlConfig } from "@lawbrador/shared/src/schemas/rules";
import Paper, { Title, Content } from '@smui/paper';
import EditableUrlComponent from './EditableUrlComponent.svelte';
import { EMPTY_URL_COMPONENT } from "@lawbrador/shared/src/examples";
import OptionalValue from '../common/OptionalValue.svelte';
import AddButton from '../common/AddButton.svelte';
export let urlConfig: UrlConfig;
const EMTPY_QUERY_COMPONENT = { key: "", value: EMPTY_URL_COMPONENT };
let { pathComponents, queryComponents } = urlConfig;
let queryComponentsEntries = Object.entries(queryComponents).map(e => ({"key": e[0], "value": e[1] }));
</script>


<TextField bind:value={urlConfig.base} label="Base url" required={true} />

<Paper>
	<Title>Path components</Title>
	<Content>
	{#each pathComponents as component }
		<OptionalValue bind:value={component} bind:list={pathComponents} >
			<EditableUrlComponent bind:config={component} />
		</OptionalValue>
	{/each}
	<AddButton bind:value={pathComponents} empty={EMPTY_URL_COMPONENT} /> 
	</Content>
</Paper>
<Paper>
	<Title>Query components</Title>
	<Content>
	{#each queryComponentsEntries as entry }
			<Paper>
				<Content>
		<OptionalValue bind:value={entry} bind:list={queryComponentsEntries} >
			<TextField bind:value={entry.key} label="Query param" />
			<EditableUrlComponent bind:config={entry.value} />

		</OptionalValue>
				</Content>
			</Paper>
	{/each}
	<AddButton bind:value={queryComponentsEntries} empty={EMTPY_QUERY_COMPONENT} /> 
	</Content>
</Paper>

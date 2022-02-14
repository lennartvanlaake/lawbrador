<script lang="ts">
import EditableSourceConfig from "$lib/components/config/EditableSourceConfig.svelte";
import SourceConfigSelector from "$lib/components/search/SourceConfigSelector.svelte";
import type { SourceConfigEditorProps } from "./types";
import { EMPTY_SOURCE_CONFIG } from "@lawbrador/shared"
import Button, { Label } from '@smui/button';
import type { SourceSiteConfig } from "@lawbrador/shared";
import * as Api from "$lib/ts/api";
export let properties: SourceConfigEditorProps;

let isValid: boolean = false;
function setSourceConfig(e: CustomEvent<SourceSiteConfig>) {
	properties = { ...properties, sourceConfig: e.detail};
	console.log(properties);
}
async function submit() {
	if (!properties.sourceConfig || !isValid) return;
	let id: string;
	if ("_id" in properties.sourceConfig) {
		await Api.updateSourceConfig(properties.sourceConfig);
		id = properties.sourceConfig._id;
	} else {
		const result = await Api.newSourceConfig(properties.sourceConfig);
		id = result._id;
	}
	properties.sourceConfigs = await Api.getSourceConfigs();
	properties.sourceConfig = properties.sourceConfigs.filter(c => c._id == id)[0];
}
$: console.log(properties);
</script>
<SourceConfigSelector sourceConfigList={properties.sourceConfigs} on:configSelected={setSourceConfig}/>
<Button on:click={() => properties.sourceConfig = EMPTY_SOURCE_CONFIG}>
	<Label>New</Label>
</Button>
<Button disabled={!isValid} on:click={submit} >
	<Label>Submit</Label>
</Button>
{#if properties.sourceConfig }
	<EditableSourceConfig sourceConfig={properties.sourceConfig} bind:isValid={isValid} />
{/if}


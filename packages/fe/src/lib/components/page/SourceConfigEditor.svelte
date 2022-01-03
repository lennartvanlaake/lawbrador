<script lang="ts">
import AddButton from "$lib/components/common/AddButton.svelte";
import EditableSourceConfig from "$lib/components/config/EditableSourceConfig.svelte";
import SourceConfigSelector from "$lib/components/search/SourceConfigSelector.svelte";
import type { SourceConfigEditorProps } from "./types";
import { EMPTY_SOURCE_CONFIG } from "@lawbrador/shared/src/examples"
import type { SourceSiteConfig } from "@lawbrador/shared/src/schemas/rules";
export let properties: SourceConfigEditorProps;
let { sourceConfigs = [], sourceConfig = EMPTY_SOURCE_CONFIG } = properties;
const selectNewConfig = (evt: CustomEvent<SourceSiteConfig>) => { 
	sourceConfig = evt.detail;
};
console.log(properties);
</script>
<SourceConfigSelector sourceConfig={sourceConfig} sourceConfigList={sourceConfigs} />
<AddButton bind:value={sourceConfigs} empty={EMPTY_SOURCE_CONFIG} on:new={selectNewConfig} />
{#if properties.sourceConfig }
	<EditableSourceConfig sourceConfig={sourceConfig}/>
{/if}


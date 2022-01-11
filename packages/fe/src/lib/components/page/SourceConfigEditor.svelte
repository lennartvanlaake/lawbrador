<script lang="ts">
import EditableSourceConfig from "$lib/components/config/EditableSourceConfig.svelte";
import SourceConfigSelector from "$lib/components/search/SourceConfigSelector.svelte";
import type { SourceConfigEditorProps } from "./types";
import { EMPTY_SOURCE_CONFIG } from "@lawbrador/shared/src/examples"
import type { SourceSiteConfig } from "@lawbrador/shared/src/schemas/rules";
import Button, { Label } from '@smui/button';
export let properties: SourceConfigEditorProps;
const selectNewConfig = (evt: CustomEvent<SourceSiteConfig>) => { 
	properties.sourceConfig = evt.detail;
};
let isValid: boolean = false;
console.log(properties);
</script>
<SourceConfigSelector sourceConfigList={properties.sourceConfigs} />
<Button on:click={() => properties.sourceConfig = EMPTY_SOURCE_CONFIG}>
	<Label>New</Label>
</Button>
<Button disabled={!isValid} >
	<Label>Submit</Label>
</Button>
{#if properties.sourceConfig }
	<EditableSourceConfig sourceConfig={properties.sourceConfig} bind:isValid={isValid} />
{/if}


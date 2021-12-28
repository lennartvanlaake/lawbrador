<script lang="ts">
import SourceConfigSelector from "$lib/components/search/SourceConfigSelector.svelte";
import type { SourceConfigEditorProps } from "./types";
export let properties: SourceConfigEditorProps;
</script>
<SourceConfigSelector sourceConfig={properties.sourceConfig} sourceConfigList={properties.sourceConfigs} />
{#if properties.sourceConfig }
	<EditableSourceConfig sourceConfig={properties.sourceConfig}/>
{:else }
	<NewSourceConfigButton />
{/if}


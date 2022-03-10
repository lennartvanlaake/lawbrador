<script lang="ts">
	import EditableSourceConfig from '$lib/components/config/EditableSourceConfig.svelte';
	import SourceConfigSelector from '$lib/components/search/SourceConfigSelector.svelte';
	import type { SourceConfigEditorProps } from './types';
	import { EMPTY_SOURCE_CONFIG } from '@lawbrador/shared';
	import type { SourceSiteConfig } from '@lawbrador/shared';
	import * as Api from '$lib/ts/api';
	export let properties: SourceConfigEditorProps;

	let isValid = false;
	function setSourceConfig(e: CustomEvent<SourceSiteConfig>) {
		properties = { ...properties, sourceConfig: e.detail };
		console.log(properties);
	}
	async function submit() {
		if (!properties.sourceConfig || !isValid) return;
		let id: string;
		if ('_id' in properties.sourceConfig) {
			await Api.updateSourceConfig(properties.sourceConfig);
			id = properties.sourceConfig._id;
		} else {
			const result = await Api.newSourceConfig(properties.sourceConfig);
			id = result._id;
		}
		properties.sourceConfigs = await Api.getSourceConfigs();
		//@ts-ignore
		properties.sourceConfig = properties.sourceConfigs.filter((c) => c._id == id)[0];
		alert('Submitted succesfully');
	}
	$: console.log(properties);
</script>

<SourceConfigSelector
	sourceConfigList={properties.sourceConfigs}
	on:configSelected={setSourceConfig}
/>
<button on:click={() => (properties.sourceConfig = EMPTY_SOURCE_CONFIG)}> New </button>
<button disabled={!isValid} on:click={submit}> Submit </button>
{#if properties.sourceConfig}
	<EditableSourceConfig sourceConfig={properties.sourceConfig} bind:isValid />
{/if}

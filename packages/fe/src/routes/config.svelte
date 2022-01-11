<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { SourceConfigEditorProps } from '$lib/components/page/types';
	import SourceConfigEditor from '$lib/components/page/SourceConfigEditor.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
	import { getSourceConfigs } from '$lib/ts/api';
	import { EMPTY_SOURCE_CONFIG } from '@lawbrador/shared/src/examples';
	export const load: Load = async ({ page, fetch }) => {
		const sources: SourceSiteConfig[] = await getSourceConfigs(fetch);
		const source = sources?.length > 1 ? sources[0] : EMPTY_SOURCE_CONFIG;
		const props: SourceConfigEditorProps = {
			sourceConfigs: sources,
			sourceConfig: source
		};
		return {
			properties: props
		};
	};
</script>

<script lang="ts">
	export let properties: SourceConfigEditorProps;
</script>

<SourceConfigEditor {properties} />

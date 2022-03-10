<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { SourceConfigEditorProps } from '$lib/components/page/types';
	import SourceConfigEditor from '$lib/components/page/SourceConfigEditor.svelte';
	import type { SourceSiteConfig } from '@lawbrador/shared';
	import { getSourceConfigs } from '$lib/ts/api';
	export const load: Load = async ({ fetch }) => {
		const sources: SourceSiteConfig[] = (await getSourceConfigs(fetch)) ?? [];
		const editorProps: SourceConfigEditorProps = {
			sourceConfigs: sources,
			sourceConfig: null
		};
		return {
			props: {
				editorProps: editorProps
			}
		};
	};
</script>

<script lang="ts">
	export let editorProps: SourceConfigEditorProps;
</script>

<SourceConfigEditor bind:properties={editorProps} />

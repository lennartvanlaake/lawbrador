<script context="module" lang="ts">
import type { SourceSiteConfig } from "@lawbrador/shared/src/schemas/rules";
import SourceConfigComponent from './SourceConfigComponent.svelte';
import SourceConfigSelector from '../search/SourceConfigSelector.svelte';
import { getSourceConfigs } from "$lib/api";
export let currentConfig: SourceSiteConfig | null = null;
	
	export const load: Load = async ({ page, fetch}) => {
		const sources: SourceSiteConfig[] = await getSourceConfigs(fetch);
		return { 
			props: {
				sourceConfigs: sources,
			}
		};
	}
</script>

<script>

</script>
<SourceConfigSelector

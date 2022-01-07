<script context="module" lang="ts">
import type { Load } from "@sveltejs/kit";
import type { SourceSiteConfig } from "@lawbrador/shared/src/schemas/rules";
import { getSourceConfigs } from "$lib/ts/api";
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

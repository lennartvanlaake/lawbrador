<script context="module" lang="ts">
	import type { SourceSiteConfig } from '@legalthingy/shared/schemas/rules';
	import type { Load } from "@sveltejs/kit";
	export const load: Load = async ({ page, fetch }) => {
		const url = `http://localhost:8080/api/sources`;
		const res = await fetch(url);
		const sources: SourceSiteConfig[] =  await res.json();
		console.log(sources);
		return { 
			props: {
				sourceConfigs: sources,
			}
		};
	}
</script>

<script lang="ts">
	import { search } from '@legalthingy/parse/src/searcher';
	export let sourceConfigs: SourceSiteConfig[] = [];
	let searchTerm = "";
	let searchResults = [];	
	let selectedName;
	let selected: SourceSiteConfig;
	$: selected = sourceConfigs.filter((conf) => conf.name == selectedName)[0] 
	function submitQuery() {
	}
</script>

<h1>Search here</h1>
<textarea id="text-field" bind:value={searchTerm} />
<button on:click={submitQuery}>search</button>
<select bind:value="{selectedName}">
{#each sourceConfigs as config }
	<option value={config.name}>{config.name}</option>	
{/each }
</select>
{#each searchResults as result }
	
{/each }

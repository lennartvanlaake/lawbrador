
<script lang="ts">
	import { getSourceConfig, getCurrentResult } from '$lib/store';
	import { scrape } from '$lib/api';
	import { onMount } from 'svelte';
	onMount(async () => {
		const currentResult = getCurrentResult();
		const sourceConfig = getSourceConfig();
		try {
			const scrapeResult = await scrape({url: currentResult.link, sourceConfigId: sourceConfig.id })
			console.debug(scrapeResult);
			window.location.replace(`/document/${scrapeResult.id}`);
		} catch (e) {
			console.error(e);
			alert("scraping failed");
		}
	})
</script>


<h1>Loading...</h1>

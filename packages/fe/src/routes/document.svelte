
<script lang="ts">
	import { getSourceConfig, getCurrentResult } from '$lib/store';
	import { scrape } from '$lib/api';
	import { onMount } from 'svelte';
	onMount(async () => {
		const currentResult = getCurrentResult();
		const sourceConfig = getSourceConfig();
		try {
			const link:string = currentResult.link;
			const path = link[0] == '.' ? link.substring(1) : link;
			const url = sourceConfig.baseUrl + path;
			const scrapeResult = await scrape(url)
			console.debug(scrapeResult);
			window.location.replace(`/document/${scrapeResult._id}`);
		} catch (e) {
			console.error(e);
			alert("scraping failed");
		}
	})
</script>


<h1>Loading...</h1>

<script lang="ts">
	import { getSourceConfig } from "./store";
	import { scrape } from '$lib/api';
	import type { SearchResult } from '@legalthingy/shared/schemas/search';
	import { createEventDispatcher } from "svelte";
	export let data: SearchResult;
	const dispatch = createEventDispatcher();
	let hasDocument = !!data.document?.id;
	let link = hasDocument ?  `/document/${data.document.id}` : "#";
	async function onClick() {
		dispatch("searchResultClicked");
		if (!hasDocument) {
			try {
				const result = await scrape({ url: data.href, sourceConfigId: getSourceConfig().id });
				document.location.replace(`/document/${result.id}`);
			} catch (e) {
				alert("scraping failed");	
				console.error(e);
			}
		}
	}
</script>

<p>
<a href="{link}" on:click|once="{onClick}">{data.text}</a>
</p>

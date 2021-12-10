<script lang="ts">
import { getSourceConfig } from "./store";
import { scrape } from '$lib/api';
import type { SearchResult } from '@legalthingy/shared/schemas/search';
export let data: SearchResult;
let hasDocument = !!data.document?.id;
let link = hasDocument ?  `/document/${data.document.id}` : "#";
async function onClick() {
	window.history.pushState({}, 'Home', '/');
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
<a href="{link}" on:click="{onClick}">{data.text}</a>
</p>

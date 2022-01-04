<script lang="ts">
	import { scrape } from '$lib/ts/api';
	import type { SearchResult } from '@lawbrador/shared/src/schemas/search';
	import type { SourceSiteConfig } from '@lawbrador/shared/src/schemas/rules';
	import { createEventDispatcher } from 'svelte';
	export let data: SearchResult;
	export let sourceConfig: SourceSiteConfig;
	const dispatch = createEventDispatcher();
	let hasDocument = !!data.document?.id;
	let link = hasDocument ? `/document/${data.document.id}` : '#';
	async function onClick() {
		dispatch('searchResultClicked');
		if (!hasDocument) {
			try {
				const result = await scrape({ url: data.href, sourceConfigId: sourceConfig.id });
				document.location.replace(`/document/${result.id}`);
			} catch (e) {
				alert('scraping failed');
				console.error(e);
			}
		}
	}
</script>

<p>
	<a href={link} on:click|once={onClick}>{data.text}</a>
</p>

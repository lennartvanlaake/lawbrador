<script context="module" lang="ts">
	export const ssr = false;
	import type { Load } from '@sveltejs/kit';
	import DocumentView from '$lib/components/view/DocumentView.svelte';
	import { getDocument } from '$lib/ts/api';
	import type { RestructuredDocument } from '@lawbrador/shared/src/schemas/scrape';
	export const load: Load = async ({ url, fetch }) => {
		const documentUrl = url.searchParams.get("url");
		const sourceConfigId = url.searchParams.get("sourceConfigId");
		if (!documentUrl || !sourceConfigId) throw Error(`documentUrl: ${documentUrl} sourceConfigId ${sourceConfigId}`) 
		const doc = await getDocument(documentUrl, sourceConfigId, fetch);
		return {
			props: {
				document: doc
			}
		};
	};
</script>

<script lang="ts">
	export let document: RestructuredDocument;
</script>

<DocumentView {document} />

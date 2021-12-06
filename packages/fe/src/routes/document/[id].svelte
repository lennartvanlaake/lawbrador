<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import DocumentView from '$lib/DocumentView.svelte';	
	import { getDocument } from '$lib/api';	
	import type { RestructuredDocument } from '@legalthingy/shared/schemas/document_version';
	export const load: Load = async ({ page, fetch }) => {
		const doc = await getDocument(page.params.id, fetch);
		return { 
			props: {
				document: doc,
			}
		};
	}
</script>

<script lang="ts">
	export let document: RestructuredDocument;
</script>

<DocumentView document={document}></DocumentView>

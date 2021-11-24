<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import DocumentView from '$lib/DocumentView.svelte';
	import type { Document } from '@legalthingy/parse/src/document_factory';
	export const load: Load = async ({ page, fetch }) => {
		const url = `http://localhost:8080/api/document/${page.params.id}`;
		const res = await fetch(url);
		const doc: Document =  await res.json();
		return { 
			props: {
				document: doc,
			}
		};
	}
</script>

<script lang="ts">
	export let document: Document;
</script>

<DocumentView document={document}></DocumentView>

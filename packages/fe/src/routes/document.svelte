<script context="module" lang="ts">
	import GoToOriginalModal from '$lib/components/view/GoToOriginalModal.svelte';
	import type { Load } from '@sveltejs/kit';
	import DocumentView from '$lib/components/view/DocumentView.svelte';
	import { getDocument } from '$lib/ts/api';
	import type { RestructuredDocument } from '@lawbrador/shared';
	export const load: Load = async ({ url, fetch }) => {
		const documentUrl = url.searchParams.get('url');
		const sourceConfigId = url.searchParams.get('sourceConfigId');
		if (!documentUrl || !sourceConfigId)
			throw Error(`documentUrl: ${documentUrl} sourceConfigId ${sourceConfigId}`);
		try {
			const doc = await getDocument(documentUrl, sourceConfigId, fetch);
			return {
				props: {
					document: doc
				}
			};
		} catch (e) {
			return {
				props: {
					error: e.message,
					url: documentUrl
				}
			};
		}
	};
</script>

<script lang="ts">
	export let document: RestructuredDocument | undefined;
	export let error: string | undefined;
	export let url: string | undefined;
	console.debug(document);
	if (error) {
		console.error(error);
	}
</script>

{#if document}
	<DocumentView {document} />
{:else}
	<GoToOriginalModal link={url ?? ''} />
{/if}

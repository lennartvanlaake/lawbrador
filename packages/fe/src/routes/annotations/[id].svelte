<script context="module" lang="ts">
import { getAnnotation, getDocuments } from '$lib/ts/api';
import { Annotation, nodeToTextAndTags, RenderedDocument, RestructuredDocument } from '@lawbrador/shared';

	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch }) => {
        const { id } = params;
        const annotation = await getAnnotation(id, fetch);
        const docRefs = new Set(annotation.markings.map(it => it.documentReference));
        const docs = await getDocuments([...docRefs]);
        const renderedDocs = docs.map(it => {
          return new RenderedDocument(nodeToTextAndTags(it.body), it.reference);
        })
        return {
			props: { annotation: annotation, documents: renderedDocs }
		};
	};
</script>

<script lang="ts">
import AnnotationView from "$lib/components/annotation/AnnotationView.svelte";

	export let annotation: Annotation;
	export let documents: RenderedDocument[];
</script>

<AnnotationView {annotation} {documents}/>


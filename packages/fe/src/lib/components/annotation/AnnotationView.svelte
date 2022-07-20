<script lang="ts">
    import MarkingView from "$lib/components/annotation/MarkingView.svelte";
    import type { Annotation, RenderedDocument } from "@lawbrador/shared";
    export let annotation: Annotation;
    export let documents: RenderedDocument[];
    $: documentMap = documents.reduce((rec, doc) => {
        rec[doc.reference.hash] = doc;
        return rec;
    }, {} as Record<string, RenderedDocument>)

</script>

<h1>{annotation.name}</h1>
{#each annotation.markings as marking }
   <MarkingView {marking} doc={ documentMap[marking.documentReference.hash ].copy() } /> 
{/each}
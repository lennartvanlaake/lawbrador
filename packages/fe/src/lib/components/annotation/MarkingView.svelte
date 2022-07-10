<script lang="ts">
    import { ID_PLACEHODER, Marking, RenderedDocument, UnidentifiedTagOrText } from "@lawbrador/shared";
    import { afterUpdate, onMount, tick } from "svelte";
    export let marking: Marking;
    export let doc: RenderedDocument;
	let containerElement: HTMLDivElement;
    const pre: UnidentifiedTagOrText = {
		origin: 'marker',
		type: 'open',
		text: `<mark id="${ID_PLACEHODER}">`
	};
	const post: UnidentifiedTagOrText = {
		origin: 'marker',
		type: 'close',
		text: '</mark>'
	};          
    doc.wrapPositions({end: marking.end, start: marking.start}, pre, post, marking._id);
    onMount(async () => {
        await tick();
        const element = document.getElementById(marking._id);
        if (element) {
            containerElement.scrollTo(0,  (element.offsetTop - containerElement.offsetTop) - (containerElement.clientHeight / 2));
        }
    })
</script>

<div class="bordered" bind:this={containerElement} >
    {@html doc.htmlString}
</div>

<style>
    .bordered {
        height: 10rem;
        border-radius: 1rem;
        border: 0.1rem solid gray;
        width: 100%;
        overflow-y: scroll;
    }
</style>
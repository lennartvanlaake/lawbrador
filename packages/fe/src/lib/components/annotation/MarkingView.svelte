<script lang="ts">
    import { ID_PLACEHODER, Marking, RenderedDocument, UnidentifiedTagOrText } from "@lawbrador/shared";
    import { onMount, tick } from "svelte";
    import ExpandButton from "../common/ExpandButton.svelte";
    export let marking: Marking;
    export let doc: RenderedDocument;
	let scrollElement: HTMLDivElement;
    $: isFaded = true;
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
        scrollToMarking();
    })

    function scrollToMarking() {
        const element = document.getElementById(marking._id);
        if (element) {
            scrollElement.scrollTo(0,  element.offsetTop - (scrollElement.clientHeight / 2));
        }
    }

    async function expandButtonClicked() {
        isFaded = !isFaded;
        await tick();
        scrollToMarking();
    }
</script>



<h3>{doc.reference.name}</h3>
<div class="container" class:faded={isFaded} class:large={!isFaded} >
    <div class="scrollable" bind:this={scrollElement} >
        {@html doc.htmlString}
    </div>
    <div class="expand">
        <ExpandButton isPlus={isFaded} on:click={expandButtonClicked}></ExpandButton>
    </div>
</div>

<style>
    .expand {
        display: flex;
        justify-content: center;
    }

    .container {
        height: 10rem;
        border-radius: 1rem;
        /* border: 0.01rem solid gray;  */
        position: relative;       
        width: 100%;
    }

    .scrollable {
        overflow-y: scroll;
        width: 100%;
        height: 100%;
    }

    .large {
        height: 40rem;
    }

    .faded::before {
        content:'';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-image: linear-gradient(
            to bottom,
            white 0%,
            white 10%,
            transparent 30%, 
            transparent 70%,
            white 90%,
            white 100%
        );
        z-index: 30;
    } 
</style>
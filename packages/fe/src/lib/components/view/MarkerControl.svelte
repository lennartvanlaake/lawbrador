<script lang="ts">
import { scrollElementToCenter } from '$lib/ts/utils';

	import { RenderedDocument, Marking, TagOrText, UnidentifiedTagOrText, id, ID_PLACEHODER } from '@lawbrador/shared';
import { marking } from '@lawbrador/shared/src/schemas/annotation';
	import { onMount, createEventDispatcher, onDestroy } from 'svelte';
import { destroy_component } from 'svelte/internal';
	export let renderedDocument: RenderedDocument;
	export let enabled: boolean;
	export let documentElement: Element;

	let markings: Marking[] = []
	let selectedMarking: Marking | null = null
	let selectedMarkingIndex: number = 0
	$: highlightSelected = false;
	const dispatch = createEventDispatcher<{ htmlChanged: string }>();
	const SELECTION_EVENT_NAME = 'selectionchange';
	const pre: UnidentifiedTagOrText = {
		origin: 'marker',
		type: 'open',
		text: `<mark id="${ID_PLACEHODER}">`,
	};
	const post: UnidentifiedTagOrText = {
		origin: 'marker',
		type: 'close',
		text: '</mark>',
	};

	let lastValidSelection: Selection | null = null;
	function resetMarks() {
		renderedDocument.filter((it) => it.origin != 'marker');
		dispatch('htmlChanged', renderedDocument.htmlString);
	}

	async function disable() {
		enabled = false;
		resetMarks();
	}
	function selectionChangedHandler() {
		const selection = document.getSelection();
		// this is needed to prevent clicks to be interpreted as selections
		if (selection?.type == 'Range') {
			highlightSelected = true;
			// this is needed to clone Selection object, normal clone method does not work since Selection includes Window
			lastValidSelection = {
				anchorNode: selection.anchorNode,
				anchorOffset: selection.anchorOffset,
				focusNode: selection.focusNode,
				focusOffset: selection.focusOffset
			} as Selection;
		}
	}

	function markSelection() {
		if (!lastValidSelection) {
			alert('No selection to be highlighted!');
			return;
		}
		const positions = renderedDocument.positionsFromSelection(lastValidSelection);
		const markingId = id();
		renderedDocument.wrapPositions(positions, pre, post, markingId);
		addMarking({ ...positions, id: markingId });
		dispatch('htmlChanged', renderedDocument.htmlString);
	}

	function addMarking(marking: Marking) {
		markings = [ ...markings, marking ]
		markings.sort((a, b) => { return a.start - b.start })		
	}

	function selectMarking(marking: Marking) {
		if (selectedMarking) {
			const element = document.getElementById(selectedMarking.id)
			if (element) {
				element.style.textDecoration = 'none';
			}
		} 
		
		selectedMarking = marking;
		selectedMarkingIndex = markings.indexOf(marking)
		const element =document.getElementById(marking.id)
		if (element) {
			element.style.textDecoration = 'underline';
			scrollElementToCenter(element);
		}
	}

	function increaseMarkingIndex() {
		const index = (selectedMarkingIndex + 1) % markings.length;
		selectMarking(markings[index]);
	}

	function decreaseMarkingIndex() {
		const index = selectedMarkingIndex == 0 ? markings.length - 1 : markings.length - 1;
		selectMarking(markings[index]);
	}

	onMount(() => {
		document.addEventListener(SELECTION_EVENT_NAME, selectionChangedHandler);
	});
	onDestroy(() => {
		document.removeEventListener(SELECTION_EVENT_NAME, selectionChangedHandler);
	});
</script>

<div id="control-bg">
	{#if highlightSelected}
		<span>Higlight selection?</span>
		<span class="progress"
		>{markings.length > 0 ? selectedMarkingIndex + 1 : 0}/{markings.length}</span
	>
	<i class="fa-solid fa-angle-up" on:click={decreaseMarkingIndex} />
	<i class="fa-solid fa-angle-down" on:click={increaseMarkingIndex} />
	<div class="right-icons">
		<i class="fa-solid fa-check" on:click={markSelection} />
		<i class="fa-solid fa-xmark" on:click={disable} />
	</div>
	{:else}
		<span>No selection...</span>
	{/if}
</div>

<style>
	#control-bg {
		background-color: white;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
	}

	.right-icons {
		margin-left: auto;
	}

	i {
		padding-right: 1rem;
	}

	i:hover {
		color: var(--accent-light);
	}
</style>

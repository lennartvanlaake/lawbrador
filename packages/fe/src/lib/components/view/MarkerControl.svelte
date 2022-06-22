<script lang="ts">
	import { updateAnnotation } from '$lib/ts/api';
	import { scrollElementToCenter } from '$lib/ts/utils';
	import {
		Annotation,
		id,
		ID_PLACEHODER,
		Marking,
		RenderedDocument,
		UnidentifiedTagOrText
	} from '@lawbrador/shared';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import AnnotationSelectorModal from './AnnotationSelectorModal.svelte';
	export let renderedDocument: RenderedDocument;
	export let enabled: boolean;

	let annotation: Annotation | null = null;
	let selectedMarking: Marking | null = null;
	let selectedMarkingIndex: number = 0;
	$: displayedIndex = annotation?.markings?.length ?? 0 > 0 ? selectedMarkingIndex + 1 : 0;
	$: displayedLength = annotation?.markings?.length ?? 0;
	$: highlightSelected = false;
	$: addExistingMarkings(annotation);

	function addExistingMarkings(_: any) {

		resetMarks();
		annotation?.markings.forEach((it) => {
			if (it.documentReference.hash == renderedDocument.reference.hash) {
				renderedDocument.wrapPositions({ start: it.start, end: it.end }, pre, post, it._id);
			}
		});
		dispatch('htmlChanged', renderedDocument.htmlString);
	}

	const dispatch = createEventDispatcher<{ htmlChanged: string }>();
	const SELECTION_EVENT_NAME = 'selectionchange';
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
		addMarking({ ...positions, _id: markingId, documentReference: renderedDocument.reference });
		dispatch('htmlChanged', renderedDocument.htmlString);
	}

	async function addMarking(marking: Marking) {
		annotation!!.markings = [...annotation!!.markings, marking];
		annotation!!.markings.sort((a, b) => {
			return a.start - b.start;
		});
		updateAnnotation(annotation!!);
	}

	function selectMarking(marking: Marking) {
		if (selectedMarking) {
			const element = document.getElementById(selectedMarking._id);
			if (element) {
				element.style.textDecoration = 'none';
			}
		}

		selectedMarking = marking;
		selectedMarkingIndex = annotation!!.markings.indexOf(marking);
		const element = document.getElementById(marking._id);
		if (element) {
			element.style.textDecoration = 'underline';
			scrollElementToCenter(element);
		}
	}

	function increaseMarkingIndex() {
		const index = (selectedMarkingIndex + 1) % annotation!!.markings.length;
		selectMarking(annotation!!.markings[index]);
	}

	function decreaseMarkingIndex() {
		const index =
			selectedMarkingIndex == 0
				? annotation!!.markings.length - 1
				: annotation!!.markings.length - 1;
		selectMarking(annotation!!.markings[index]);
	}

	onMount(() => {
		document.addEventListener(SELECTION_EVENT_NAME, selectionChangedHandler);
	});
	onDestroy(() => {
		document.removeEventListener(SELECTION_EVENT_NAME, selectionChangedHandler);
	});
</script>

<div id="control-bg">
	{#if !annotation}
		<AnnotationSelectorModal bind:annotation />
	{:else if highlightSelected}
		<span>Current annotation: <strong>{annotation.name}</strong></span>
		<span>Higlight selection?</span>
		<span class="progress">{displayedIndex}/{displayedLength}</span>
		<i class="fa-solid fa-angle-up" on:click={decreaseMarkingIndex} />
		<i class="fa-solid fa-angle-down" on:click={increaseMarkingIndex} />
		<div class="right-icons">
			<i class="fa-solid fa-check" on:click={markSelection} />
			<i class="fa-solid fa-xmark" on:click={disable} />
		</div>
	{:else}
		<span>Current annotation: <strong>{annotation.name}</strong> </span>
		<span>No selection...</span>
	{/if}
</div>

<style>
	span {
		margin-left: 1rem;
	}

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

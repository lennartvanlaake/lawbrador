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
import Modal from '../common/Modal.svelte';
	import AnnotationSelectorModal from './AnnotationSelectorModal.svelte';
	export let renderedDocument: RenderedDocument;
	export let enabled: boolean;
	export let documentElement: HTMLElement;

	let annotation: Annotation | null = null;
	let selectedMarking: Marking | null = null;
	let selectedMarkingIndex: number = 0;
	let showMarkingMakerModal = false;
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

	function generateClosingMark(id: string) {
		const removeButtonElement = document.createElement('i');
		removeButtonElement.className = 'fa-solid fa-square-xmark';
		removeButtonElement.onclick = () => {
			if (annotation) {
				annotation.markings = annotation!.markings.filter((it) => it._id != id);
				updateAnnotation(annotation);
			}
		};
		return removeButtonElement;
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

	let selectionOngoing = false;
	function selectionChangedHandler() {
		// debugger;
		const selection = document.getSelection();
		// this is needed to prevent clicks to be interpreted as selections
		if (!selection || selection.type != 'Range') {
			return;
		}
		highlightSelected = true;
		// this is needed to clone Selection object, normal clone method does not work since Selection includes Window
		lastValidSelection = {
			anchorNode: selection.anchorNode,
			anchorOffset: selection.anchorOffset,
			focusNode: selection.focusNode,
			focusOffset: selection.focusOffset
		} as Selection;
		if (!selectionOngoing) {
			selectionOngoing = true;
			documentElement?.addEventListener('mouseup', openMarkingModal);
	}
}

function openMarkingModal() {
		if (document.getSelection()?.toString().trim() == "") {
			return;
		}
		selectionOngoing = false;
		showMarkingMakerModal = true;
		documentElement?.removeEventListener('mouseup', openMarkingModal);
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
		showMarkingMakerModal = false;
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
				if (element.nextElementSibling?.className.includes('fa')) {
					element.nextElementSibling.remove();
				}
			}
		}

		selectedMarking = marking;
		selectedMarkingIndex = annotation!!.markings.indexOf(marking);
		const element = document.getElementById(marking._id);
		if (element) {
			element.style.textDecoration = 'underline';
			element.after(generateClosingMark(marking._id));
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
	{:else}
		<span>Current annotation: <strong>{annotation.name}</strong></span>

		<span class="progress">{displayedIndex}/{displayedLength}</span>
		<i class="fa-solid fa-angle-up" on:click={decreaseMarkingIndex} />
		<i class="fa-solid fa-angle-down" on:click={increaseMarkingIndex} />
		<div class="right-icons">
			<i class="fa-solid fa-xmark" on:click={disable} />
		</div>
	{/if}

	{#if showMarkingMakerModal }
			<Modal closable={true} bind:show={showMarkingMakerModal}>
				<h3>Do you wish to highlight the following text?</h3>
				<em>{document.getSelection()?.toString()}</em>
				<div>
					<label for="bla">Add your comment</label>
				</div>
				<textarea id="bla"></textarea>
				<div>
					<button on:click={markSelection}>Yes</button><button on:click={() => showMarkingMakerModal= false}>No</button>
				</div>
				
			</Modal>
	{/if }
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

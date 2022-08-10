<script lang="ts">
	import { updateAnnotation } from '$lib/ts/api';
	import { scrollElementToCenter } from '$lib/ts/utils';
	import {
	Annotation,ID_PLACEHODER,
	Marking,
	RenderedDocument,
	UnidentifiedTagOrText
	} from '@lawbrador/shared';
	import { createEventDispatcher,onDestroy,onMount,tick } from 'svelte';
	import AnnotationSelectorModal from './AnnotationSelectorModal.svelte';
	import MarkingModal from './MarkingModal.svelte';
	export let renderedDocument: RenderedDocument;
	export let enabled: boolean;
	export let documentElement: HTMLElement;

	let annotation: Annotation | null = null;
	let selectedMarking: Marking | null = null;
	let selectedMarkingIndex: number = 0;
	let showMarkingMakerModal = false;
	let highlightSelected = false;
	$: displayedIndex = annotation?.markings?.length ?? 0 > 0 ? selectedMarkingIndex + 1 : 0;
	$: displayedLength = annotation?.markings?.length ?? 0;
	$: annotation, addExistingMarkings();

	async function addExistingMarkings() {
		resetMarks();
		annotation?.markings.forEach((it) => {
			if (it.documentReference.hash == renderedDocument.reference.hash) {
				console.log(it._id)
				renderedDocument.wrapPositions({ start: it.start, end: it.end }, pre, post, it._id);
			}
		});
		dispatch('htmlChanged', renderedDocument.htmlString);
		await tick();
		Array.from(document.getElementsByTagName("mark")).forEach(element => {
			element.onmouseover = (evt: MouseEvent) => {
				console.log(evt); 
				const targetElement = evt.target as HTMLElement;
				selectedMarking = annotation?.markings.filter(it => it._id == targetElement.id)[0]!!
				console.log(selectedMarking)
				console.log(targetElement.id);
				console.debug(annotation) 
			};
			element.onclick = (evt: MouseEvent) => {
				const targetElement = evt.target as HTMLElement;
				console.log(selectedMarking); 
				if (selectedMarking) {
					console.log("Should show the modal now...");
					showMarkingMakerModal = true;
				}
			}
			element.onmouseleave = (evt: MouseEvent) => {
				selectedMarking = null;
			}
			element.childNodes.forEach((it) => {
				const childElement = it as HTMLElement;
				childElement.style.pointerEvents = "none";
			})
		});
	}
	
	function onClickMarking(event: MouseEvent) {
		console.debug(event);
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
		if (selectedMarking) {
			return;
		}
		// debugger;
		const selection = document.getSelection();
		// this is needed to prevent clicks to be interpreted as selections
		if (!selection || selection.type != 'Range') {
			return;
		}
		highlightSelected = true;
		let selectionString = selection.toString();
		// this is needed to clone Selection object, normal clone method does not work since Selection includes Window
		lastValidSelection = {
			anchorNode: selection.anchorNode,
			anchorOffset: selection.anchorOffset,
			focusNode: selection.focusNode,
			focusOffset: selection.focusOffset,
			toString: () => selectionString
		} as Selection;
		if (!selectionOngoing) {
			selectionOngoing = true;
			documentElement?.addEventListener('mouseup', openMarkingModal);
		}
	}

	function openMarkingModal() {
		if (document.getSelection()?.toString().trim() == '') {
			return;
		}
		selectionOngoing = false;
		showMarkingMakerModal = true;
		documentElement?.removeEventListener('mouseup', openMarkingModal);
	}

	async function addMarking(marking: Marking) {
		annotation!!.markings = [...annotation!!.markings, marking];
		annotation!!.markings.sort((a, b) => {
			return a.start - b.start;
		});
		updateAnnotation(annotation!!);
		addExistingMarkings();
	}

	async function deleteMarking(marking: Marking) {
		annotation!!.markings = annotation!!.markings.filter(it => it._id != marking._id);
		updateAnnotation(annotation!!);
		addExistingMarkings();
		selectedMarking = null;
	}

	async function editMarking(marking: Marking) {
		annotation!!.markings.filter(it => it._id == marking._id)[0] = marking;
		updateAnnotation(annotation!!);
		addExistingMarkings();
		selectedMarking = null;
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

	{#if showMarkingMakerModal}
		<MarkingModal
			{selectedMarking}
			bind:showMarkingMakerModal
			bind:renderedDocument
			bind:selection={lastValidSelection}
			on:markingAdded={(evt) => addMarking(evt.detail)}
			on:markingDeleted={(evt) => deleteMarking(evt.detail)}
			on:markingEdited={(evt) => editMarking(evt.detail)}
		/>
	{/if}
</div>

<style>
	:global(mark:hover) {
		font-weight: 700;
	}

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

<script lang="ts">
	import type { RenderedDocument, TagOrText } from '@lawbrador/shared';
	import { last } from '@lawbrador/shared';
	import structuredClone from '@ungap/structured-clone';
	import { onMount, createEventDispatcher, onDestroy } from 'svelte';
	export let renderedDocument: RenderedDocument;
	export let enabled: boolean;
	export let documentElement: Element;
	$: highlightSelected = false;
	const dispatch = createEventDispatcher<{ htmlChanged: string }>();
	const SELECTION_EVENT_NAME = 'selectionchange';
	const pre: TagOrText = {
		origin: 'marker',
		type: 'open',
		text: '<mark>',
		id: '123'
	};
	const post: TagOrText = {
		origin: 'marker',
		type: 'close',
		text: '</mark>',
		id: '123'
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
			console.log(lastValidSelection);
		}
	}

	function markSelection() {
		if (!lastValidSelection) {
			alert('No selection to be highlighted!');
			return;
		}
		console.log(lastValidSelection);
		renderedDocument.wrapSelection(lastValidSelection, pre, post);
		dispatch('htmlChanged', renderedDocument.htmlString);
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

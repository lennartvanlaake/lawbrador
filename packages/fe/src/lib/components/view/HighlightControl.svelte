<script lang="ts">
	import { queryToHighlight } from '$lib/ts/stores';
	import { scrollElementToCenter } from '$lib/ts/utils';
	import type { RenderedDocument, TagOrText } from '@lawbrador/shared';
	import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';

	const dispatch = createEventDispatcher<{ htmlChanged: string }>();
	const HIGHLIGHT_CLASS = 'highlight';
	const preMatch: TagOrText = {
		id: '0',
		text: `<strong class='${HIGHLIGHT_CLASS}'>`,
		type: 'open',
		origin: 'search'
	};
	const postMatch: TagOrText = {
		id: '0',
		text: '</strong>',
		type: 'close',
		origin: 'search'
	};

	export let renderedDocument: RenderedDocument;
	export let documentElement: Element;
	export let enabled: boolean;

	const TYPING_STOPPED_TIMEOUT_MS = 400;
	let elementArray: Element[] = [];
	let elementIndex = 0;
	let selectedElement: HTMLElement;
	let timeout: number;

	onMount(() => {
		queryToHighlight.subscribe(async () => {
			await addHighlights();
		});
	});

	onDestroy(() => {
		resetHighlights();
		dispatch('htmlChanged', renderedDocument.htmlString);
	});

	async function addHighlights() {
		if (timeout) {
			clearTimeout(timeout);
		}

		setTimeout(async () => {
			// reset
			resetHighlights();
			// if no query was input or it is just 1 character: return to original state
			if (!$queryToHighlight || $queryToHighlight.length == 1) {
				dispatch('htmlChanged', renderedDocument.htmlString);
				return;
			}
			// do the actual highlighting
			renderedDocument.wrapAllMatching($queryToHighlight, preMatch, postMatch);
			// wait for html to render in browser
			dispatch('htmlChanged', renderedDocument.htmlString);
			await tick();
			// get current array of highlights
			elementArray = Array.from(documentElement.getElementsByClassName(HIGHLIGHT_CLASS));
			selectHighlight();
		}, TYPING_STOPPED_TIMEOUT_MS);
	}

	function selectHighlight() {
		if (selectedElement) selectedElement.style.textDecoration = 'none';
		selectedElement = elementArray[elementIndex] as HTMLElement;
		if (!selectedElement) return;
		scrollElementToCenter(selectedElement);
		selectedElement.style.textDecoration = 'underline';
	}

	function increaseElementIndex() {
		elementIndex = (elementIndex + 1) % elementArray.length;
		selectHighlight();
	}

	function decreaseElementIndex() {
		// if at first element, start at top again, else decrease index by one
		elementIndex = elementIndex == 0 ? elementArray.length - 1 : elementIndex - 1;
		selectHighlight();
	}

	function resetHighlights() {
		elementIndex = 0;
		elementArray = [];
		renderedDocument.filter((it) => it.origin != 'search');
	}

	async function disable() {
		enabled = false;
		resetHighlights();
		dispatch('htmlChanged', renderedDocument.htmlString);
	}

	onMount(() => {
		document.addEventListener('keydown', (event) => {
			switch (event.key) {
				case 'ArrowUp':
					decreaseElementIndex();
					break;
				case 'ArrowDown':
					increaseElementIndex();
					break;
			}
		});
	});
</script>

<div id="control-bg">
	<input type="text" bind:value={$queryToHighlight} />
	<span class="progress"
		>{elementArray.length > 0 ? elementIndex + 1 : 0}/{elementArray.length}</span
	>
	<i class="fa-solid fa-angle-up" on:click={decreaseElementIndex} />
	<i class="fa-solid fa-angle-down" on:click={increaseElementIndex} />
	<div class="right-icons">
		<i class="fa-solid fa-xmark" on:click={disable} />
	</div>
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

	input {
		min-width: 10rem;
		max-width: 20rem;
	}

	.progress {
		margin-left: 0.5rem;
		min-width: 4rem;
		display: inline-block;
	}

	i {
		padding-right: 1rem;
	}

	i:hover {
		color: var(--accent-light);
	}
</style>

<script lang="ts">
	import { queryToHighlight } from '$lib/ts/stores';
	import { wrapElements } from '@lawbrador/shared';
	import { onMount, tick } from 'svelte';

	const HIGHLIGHT_CLASS = 'highlight';
	const SELECTED_HIGHLIGHT_CLASS = 'highlight';
	const preMatch = `<strong class='${HIGHLIGHT_CLASS}'>`;
	const postMatch = '</strong>';

	export let html: string;
	export let documentElement: Element;

	const originalHtml = html;
	const TYPING_STOPPED_TIMEOUT_MS = 1000;
	let elementArray: Element[] = [];
	let elementIndex = 0;
	let selectedElement: HTMLElement;
	let timeout: number;
	onMount(() => {
		queryToHighlight.subscribe(async () => {
			await addHighlights();
		});
	});

	async function addHighlights() {
		if (timeout) {
			clearTimeout(timeout);
		}
		// reset
		elementIndex = 0;
		elementArray = [];
		html = originalHtml;

		setTimeout(async () => {
			// if no query was input or it is just 1 character: return to original state
			if (!$queryToHighlight || $queryToHighlight.length == 1) {
				return;
			}
			// do the actual highlighting
			html = wrapElements(originalHtml, $queryToHighlight, preMatch, postMatch);
			// wait for html to render in browser
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
		selectedElement.scrollIntoView();
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
</script>

<div id="control-bg">
	<div id="controls">
		<input type="text" bind:value={$queryToHighlight} />
		<span class="progress"
			>{elementArray.length > 0 ? elementIndex + 1 : 0}/{elementArray.length}</span
		>
		<i class="icon-circle-up" on:click={decreaseElementIndex} />
		<i class="icon-circle-down" on:click={increaseElementIndex} />
		<i class="icon-cancel-circle" />
	</div>
</div>

<style>
	#control-bg {
		position: fixed;
		bottom: 0px;
		background-color: white;
	}

	input {
		width: 20rem;
	}

	.progress {
		width: 4rem;
		display: inline-block;
	}
</style>

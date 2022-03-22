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
	let elementArray: Element[] = [];
	let elementIndex = 0;

	onMount(() => {
		queryToHighlight.subscribe(async () => {
			await addHighlights();
		});
	});

	async function addHighlights() {
		if (!$queryToHighlight) return;
		html = wrapElements(originalHtml, $queryToHighlight, preMatch, postMatch);
		await tick();
		elementArray = Array.from(documentElement.getElementsByClassName(HIGHLIGHT_CLASS));
		selectHighlight();
	}

	function selectHighlight() {
		const selectedHighlight = elementArray[elementIndex];
		if (!selectedHighlight) return;
		selectedHighlight.scrollIntoView();
		selectedHighlight.classList.add(SELECTED_HIGHLIGHT_CLASS);
	}

	function increaseElementIndex() {
		elementIndex = (elementIndex + 1) % elementArray.length;
	}
	function decreaseElementIndex() {
		// if at first element, start at top again, else decrease index by one
		elementIndex = elementIndex == 0 ? elementArray.length - 1 : elementIndex - 1;
	}
</script>

<div>
	<input type="text" bind:value={$queryToHighlight} />
	<span class="progress">{elementIndex + 1}/{elementArray.length}</span>
	<i class="icon-circle-up" on:click={increaseElementIndex} />
	<i class="icon-circle-down" on:click={decreaseElementIndex} />
	<i class="icon-cancel-circle" />
</div>

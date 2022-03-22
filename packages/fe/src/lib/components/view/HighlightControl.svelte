<script lang="ts">
	import { queryToHighlight } from '$lib/ts/stores';
	import { wrapElements } from '@lawbrador/shared';
	import { onMount, tick } from 'svelte';

	const HIGHLIGHT_CLASS = 'highlight';
	const preMatch = `<strong class='${HIGHLIGHT_CLASS}'>`;
	const postMatch = '</strong>';

	export let html: string;
	export let documentElement: Element;

	const originalHtml = html;
	const TYPING_STOPPED_TIMEOUT_MS = 400;
	let elementArray: Element[] = [];
	let elementIndex = 0;
	let selectedElement: HTMLElement;
	let timeout: number;
	let enabled = !!$queryToHighlight;

	onMount(() => {
		queryToHighlight.subscribe(async () => {
			await addHighlights();
		});
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
		selectedElement.scrollIntoView({ block: 'center' });
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
		html = originalHtml;
	}

	function enable() {
		enabled = true;
		addHighlights();
	}

	function disable() {
		enabled = false;
		resetHighlights();
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

{#if enabled}
	<div id="control-bg">
		<input type="text" bind:value={$queryToHighlight} />
		<span class="progress"
			>{elementArray.length > 0 ? elementIndex + 1 : 0}/{elementArray.length}</span
		>
		<i class="icon-circle-up" on:click={decreaseElementIndex} />
		<i class="icon-circle-down" on:click={increaseElementIndex} />
		<div class="right-icons">
			<i class="icon-cancel-circle" on:click={disable} />
		</div>
	</div>
{:else}
	<i class="icon-search" on:click={enable} />
{/if}

<style>
	#control-bg {
		position: fixed;
		bottom: 0px;
		background-color: white;
		border-radius: 0.5rem;
		width: 100%;
		max-width: 45rem;
		display: flex;
		align-items: center;
	}

	.icon-search {
		box-shadow: 0.1rem 0.1rem 0.1rem 0 grey;
		position: fixed;
		background-color: white;
		padding: 1rem;
		bottom: 1rem;
		right: 1rem;
		border-radius: 50%;
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
		color: var(--accent);
		font-size: 2rem;
		padding-right: 1rem;
	}

	i:hover {
		color: var(--accent-light);
	}
</style>

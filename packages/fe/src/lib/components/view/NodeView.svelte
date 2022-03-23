<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { browser } from '$app/env';
	export let html: string;
	const hashtagRegex = /#.*/;
	onMount(async () => {
		await makeHashtagLinksScrollToCenter();
	});

	async function makeHashtagLinksScrollToCenter() {
		if (!browser) return;
		await tick();
		const links = Array.from(document.getElementsByTagName('a'));
		links.forEach((it) => {
			const targetId = (it as HTMLAnchorElement).href.match(hashtagRegex);
			if (targetId) {
				// zero-index gets matched string, substring(1) removes '#'
				makeScrollToCenter(it, targetId[0].substring(1));
			}
		});
	}

	function makeScrollToCenter(linkElement: HTMLAnchorElement, elementId: string) {
		linkElement.addEventListener('click', (ev) => {
			if (!elementId) return;
			const targetElement = document.getElementById(elementId);
			if (!targetElement) return;
			ev.preventDefault();
			targetElement.scrollIntoView({ block: 'center' });
		});
	}
</script>

{@html html}

<style>
	:global(ol) {
		--accent: #815307;
		list-style-type: none;
	}
	:global(section) {
		margin-left: 2rem;
	}
	:global(.hidden) {
		display: none;
	}
	:global(.marker) {
		position: absolute;
		margin-left: -3rem;
	}
</style>

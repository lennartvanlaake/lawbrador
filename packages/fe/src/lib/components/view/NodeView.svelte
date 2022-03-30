<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { browser } from '$app/env';
	import { scrollToCenter } from '$lib/ts/utils';
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
				makeScrollToCenter(it, targetId[0]);
			}
		});
	}

	function makeScrollToCenter(linkElement: HTMLAnchorElement, elementId: string) {
		linkElement.addEventListener('click', (ev) => {
			ev.preventDefault();
			scrollToCenter(elementId);
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
		z-index: -1;
		position: absolute;
		margin-left: -3rem;
	}
</style>

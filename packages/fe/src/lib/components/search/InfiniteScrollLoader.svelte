<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Spinner from '../common/Spinner.svelte';
	const dispatch = createEventDispatcher<{ bottomReached: any }>();
	export let hasMore: boolean;
	let element: HTMLDivElement;
	let loaderIsVisible = true;
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].intersectionRatio > 0) {
				if (!loaderIsVisible && hasMore) {
					dispatch('bottomReached');
				}
				loaderIsVisible = true;
			} else {
				loaderIsVisible = false;
			}
		});
		observer.observe(element);
	});
</script>

<div bind:this={element}>
	{#if hasMore}
		<Spinner />
	{/if}
</div>

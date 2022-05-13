<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Spinner from '../common/Spinner.svelte';
	const visibleDispatcher = createEventDispatcher<{ spinnerBecameVisible: any }>();
	const hiddenDispatcher = createEventDispatcher<{ spinnerBecameHidden: any }>();
	export let hasMore: boolean;
	let element: HTMLDivElement;
	let loaderIsVisible = true;
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].intersectionRatio > 0) {
				if (!loaderIsVisible) {
					visibleDispatcher("spinnerBecameVisible")	
				}
				loaderIsVisible = true;
			} else {
				if (loaderIsVisible) {
					hiddenDispatcher("spinnerBecameHidden")
				}
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

<script lang="ts">
import { createEventDispatcher, onMount } from "svelte";
	const dispatch = createEventDispatcher<{"bottomReached": any}>();
	export let hasMore: boolean;
	export let loaderIsVisible: boolean;
	let element: HTMLDivElement;
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			console.log("observerd");
			if (entries[0].intersectionRatio > 0) {
				if (!loaderIsVisible && hasMore) {
					dispatch("bottomReached");
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
	<p>...</p>
</div>

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
	{#if hasMore }
	<p class=loading></p>
	{/if }
</div>

<style>

.loading:after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  -webkit-animation: ellipsis steps(4,end) 900ms infinite;      
  animation: ellipsis steps(4,end) 900ms infinite;
  content: "\2026"; /* ascii code for the ellipsis character */
  width: 0px;
}

@keyframes ellipsis {
  to {
    width: 20px;    
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 20px;    
  }
}
</style>



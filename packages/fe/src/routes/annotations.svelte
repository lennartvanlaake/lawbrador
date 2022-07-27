<script context="module" lang="ts">
	import { getAnnotations, getDocuments } from '$lib/ts/api';
	import type { Annotation } from '@lawbrador/shared';
	import type { Load } from '@sveltejs/kit';
	
    export const load: Load = async ({ fetch: fetch }) => {
		const annotation = await getAnnotations(fetch);
		return {
			props: { annotations: annotation }
		};
	};
</script>

<script lang="ts">
	export let annotations: Annotation[];
</script>

{#each annotations as annotation}
	<a href="/annotations/{annotation._id}">{annotation.name}</a>
{/each}

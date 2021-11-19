<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	export const load: Load = async ({ page, fetch }) => {
		const url = `http://localhost:8080/api/text/${page.params.id}`;
		const res = await fetch(url);
		return { 
			props: {
				text: await res.json(),
			}
		};
	}
</script>

<script lang="ts">
	import type { Document } from '@legalthingy/shared/schemas/text';
	export let text: Document;
	console.log(text);
</script>

<p>
	{ text.text }
</p>

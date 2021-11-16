<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	export const load: Load = async ({ page, fetch, session, stuff }) => {
		const url = "/api/messages";
		const res = await fetch(url);
		console.log(res);
		return { 
			props: {
				messages: await res.json(),
			}
		};
	}
</script>


<script lang="ts">
	import type { TextMessage } from '@legalthingy/shared';
	import axios from 'axios';
	let text = '';
	async function submit() {
		try {
			const message: TextMessage = { message: text };
			const result = await axios.post('api/text', message);
			console.log(result);
		} catch (e) {
			const error = e;
			console.error(error);
		}
	}
</script>

<h1>Upload your awesome text here!</h1>
<textarea bind:value={text} />

<button on:click={submit}>BOOM</button>

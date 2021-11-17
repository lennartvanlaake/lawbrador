<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	export const load: Load = async ({ page, fetch, session, stuff }) => {
		const url = "http://localhost:8080/api/text";
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
	import type { BodyType } from '@legalthingy/shared/schemas/text';
	import axios from 'axios';
	let text = '';
	export let messages;
	async function submit() {
		try {
			const message: BodyType = { text: text };
			const result = await axios.post('/api/text', message);
			console.log(result);
		} catch (e) {
			const error = e;
			console.error(error);
		}
	}
</script>

<h1>Upload your awesome text here!</h1>
<textarea bind:value={text} />
<ul>
	{ #each messages as message }
		<li>{ message.text }</li>
	{ /each }
</ul>
<button on:click={submit}>BOOM</button>

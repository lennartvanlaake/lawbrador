<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	export const load: Load = async ({ fetch }) => {
		const url = "http://localhost:8080/api/text";
		const res = await fetch(url);
		console.log(res);
		return { 
			props: {
				messages: await res.json(),
				url: url
			}
		};
	}
</script>

<script lang="ts">
	import type { Document, DocumentUpload } from '@legalthingy/shared/schemas/text';
	import axios from 'axios';
	let text = '';
	export let messages: [Document];
	export let url: string;
	async function submit() {
		try {
			const message: DocumentUpload  = { text: text };
			const result = await axios.post('/api/text', message);
			messages = await (await fetch(url)).json(); 
			console.log(result);
		} catch (e) {
			const error = e;
			console.error(error);
		}
	}
</script>

<h1>Upload your awesome text here!</h1>
<textarea id="text-field" bind:value={text} />
<ul>
	{ #each messages as message }
		<li>{ message.text }: { message._id }</li>
	{ /each }
</ul>
<button id="text-button" on:click={submit}>BOOM</button>

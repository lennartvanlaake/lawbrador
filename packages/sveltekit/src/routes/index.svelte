<script lang="ts">
	import axios from 'axios';
	let text = '';
	async function submit() {
		try {
			const result = await axios.post('api/text', JSON.stringify({ text: text }));
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

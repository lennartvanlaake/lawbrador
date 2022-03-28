<script lang="ts">
	import Modal from '../common/Modal.svelte';
	export let link: string;
</script>

<Modal>
	<h3>Could not parse document text</h3>
	<p>View the original on the source site or go back?</p>
	<button on:click={() => (window.location.href = link)}> To original </button>
	<button on:click={() => history.back()}> Back </button>
</Modal>

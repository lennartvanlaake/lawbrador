<script lang="ts">
	import CloseModalButton from './CloseModalButton.svelte';

	export let closable = false;
	export let show = true;
</script>

{#if show}
	<div id="background">
		<div id="content">
			{#if closable}
				<CloseModalButton on:click={() => (show = false)} />
			{/if}
			<slot />
		</div>
	</div>
{/if}

<style>
	#background {
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
	}

	#content {
		margin: 15% auto; /* 15% from the top and centered */
		padding: 20px;
		border: 1px solid #888;
		width: 80%; /* Could be more or less, depending on screen size */
		background-color: white;
	}
</style>

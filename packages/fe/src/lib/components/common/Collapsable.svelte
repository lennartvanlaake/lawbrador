<script lang="ts">
	export let isCollapsed = true;
	$: buttonContent = isCollapsed ? '+' : '-';
	function toggleCollapsed() {
		isCollapsed = !isCollapsed;
	}
</script>

<div id="container">
	<div id="title-container">
		<slot name="title" />
		<span id="button" on:click={toggleCollapsed}>{buttonContent}</span>
	</div>
	<div id="content" class:isCollapsed>
		<slot />
	</div>
</div>

<style>
	#content {
		padding-left: 1rem !important;
		background-color: var(--accent-very-light);
		border-radius: 0.5rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
		border-width: medium;
		border-color: white;
		border-style: solid;
	}

	#title-container {
		color: white;
		border-radius: 0.5rem;
		background-color: var(--accent);
		padding: 0.5rem;
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	#title-container :global(*) {
		margin: 0;
	}

	#button {
		display: flex;
		float: right;
		width: 2rem;
		height: 2rem;
		border: 2px solid #eef5df;
		background-color: var(--accent);
		border-radius: 50%;
		align-items: center;
		justify-content: center;
		font-size: large;
		color: white;
		font-weight: bold;
		order: 2;
		margin-left: auto;
	}
	#button:hover {
		cursor: pointer;
		background-color: var(--accent-light) !important;
	}

	.isCollapsed {
		display: none;
	}
</style>

<script lang="ts">
	export let searchEnabled = true;

	function toggleSearch() {
		searchEnabled = !searchEnabled;
	}
</script>

<div id="control-bg">
	<i class="icon-search" on:click={toggleSearch} />
</div>

<style>
	#control-bg {
		position: fixed;
		bottom: 0px;
		background-color: white;
		border-radius: 0.5rem;
		width: 100%;
		max-width: 45rem;
		display: flex;
		align-items: center;
	}

	.icon-search {
		box-shadow: 0.1rem 0.1rem 0.1rem 0 grey;
		position: fixed;
		background-color: white;
		padding: 1rem;
		bottom: 1rem;
		right: 1rem;
		border-radius: 50%;
	}

	.right-icons {
		margin-left: auto;
	}

	input {
		min-width: 10rem;
		max-width: 20rem;
	}

	.progress {
		margin-left: 0.5rem;
		min-width: 4rem;
		display: inline-block;
	}

	i {
		padding-right: 1rem;
	}

	i:hover {
		color: var(--accent-light);
	}
</style>

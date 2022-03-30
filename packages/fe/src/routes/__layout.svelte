<script lang="ts">
</script>

<nav>
	<a class="left" href="/">Home</a>
	<a class="right" href="/about">About</a>
	<a class="right" href="/signup">Newsletter</a>
</nav>
<div id="spacer" />
<slot />

<style>
	:global(:root) {
		--accent: #815306;
	}

	/*same as accent, but with 50% opacity*/
	:global(:root) {
		--accent-light: rgba(129, 83, 8, 0.5);
		--accent-very-light: rgba(249, 238, 220, 1);
	}

	:global(i) {
		color: var(--accent);
		font-size: 2rem;
		cursor: pointer;
		padding: 0.5rem;
	}

	:global(i:hover) {
		color: var(--accent-light) !important;
	}

	:global(button) {
		font-size: large;
	}

	#spacer {
		margin-bottom: 6rem;
	}

	.left {
		float: left;
	}

	.right {
		float: right;
	}
	nav {
		max-width: 45rem;
		width: 100%;
		position: fixed;
		background-color: white;
	}
</style>

<script lang="ts">
</script>

<nav>
	<a class="left" href="/">Home</a>
	<a class="right" href="/about">About</a>
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
	}

	#spacer {
		margin-bottom: 6rem;
	}

	:global(i) {
		color: var(--accent);
		font-size: 2rem;
	}

	:global(i:hover) {
		color: var(--accent-light) !important;
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
		z-index: 1;
	}
</style>

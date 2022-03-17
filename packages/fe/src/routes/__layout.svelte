<script lang="ts">
</script>

<nav>
	<a class="left" href="/">Home</a>
	<a class="right" href="/about">About</a>
</nav>
<div id="spacer" />
<slot />

<style>
	:global(ol) {
		--accent: #815307;
		list-style-type: none;
	}
	:global(section) {
		margin-left: 2rem;
	}
	:global(.hidden) {
		display: none;
	}
	:global(.marker) {
		position: absolute;
		margin-left: -3rem;
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

<script lang="ts">
</script>

<nav>
	<a class="left" href="/">Home</a>
	<a class="right" href="/about">About</a>
</nav>
<div id="spacer" />
<slot />

<style>
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
		z-index: 1;
	}
</style>

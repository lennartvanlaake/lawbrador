<script lang="ts">
	export let html: string;
</script>

{@html html}

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
</style>

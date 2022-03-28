<script lang="ts">
	import Toggled from '../common/Toggled.svelte';

	export let name = '';
</script>

<h1>{name}</h1>
<Toggled>
	<section>
		<slot />
	</section>
</Toggled>

<style>
	section {
		background-color: lightgrey;
		border-radius: 2rem;
	}
</style>

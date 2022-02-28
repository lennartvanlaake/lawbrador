<script lang="ts">
	import structuredClone from '@ungap/structured-clone';
	export let value: any;
	export let empty: any;
	let enabled = !!value;
	const ENABLE_TEXT = 'Enable';
	const DISABLE_TEXT = 'Disable';
	function toggle() {
		enabled = !enabled;
		if (!enabled) {
			value = undefined;
		} else {
			value = structuredClone(empty);
		}
	}
</script>

<slot name="title" />
<div>
	<button on:click={toggle}>
		{#if enabled }
			{ DISABLE_TEXT }
		{:else}
			{ ENABLE_TEXT }
		{/if } 

</button>
{#if enabled }
	<slot>
	</slot>
{/if }

</div>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import AddButton from './AddButton.svelte';
	import RemoveButton from './RemoveButton.svelte';
	export let value: string | null = null;
	export let label: string;
	export let required = false;
	const dispatch = createEventDispatcher();
	$: disabled = value === null;
	$: disabled ? dispatch('disabled') : dispatch('enabled');
	$: if (required && !value) value = '';
	function remove() {
		// a required TextField will not accept null as value
		required = false;
		value = null;
	}
</script>

<input type="text" {label} bind:value {disabled} {required} />
{#if disabled}
	<AddButton bind:value empty={''} />
{:else}
	<RemoveButton bind:value {remove} />
{/if}

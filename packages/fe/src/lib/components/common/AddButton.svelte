<script lang="ts">
	import structuredClone from '@ungap/structured-clone';
	import { createEventDispatcher } from 'svelte';
	export let value: Array<any> | any;
	export let empty: any;
	export let text: string = 'Add';
	export let disabled: boolean = false;
	const dispatch = createEventDispatcher();
	const isArray = Array.isArray(value);
	function fillProp() {
		if (isArray) {
			const newValue = structuredClone(empty);
			value = [...value, newValue];
			dispatch('new', newValue);
		} else {
			value = structuredClone(empty);
			dispatch('new', value);
		}
	}
</script>

{#if isArray || !value}
	<button on:click={fillProp} {disabled}>
		{text}
	</button>
{/if}

<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { createEventDispatcher } from 'svelte';
	export let value: Array<any> | any;
	export let empty: any;
	export let text: string = 'Add';
	export let disabled: boolean = false;
	const dispatch = createEventDispatcher();
	const isArray = Array.isArray(value);
	function newEmpty() {
		return typeof empty == 'object' ? { ...empty } : empty;
	}
	function fillProp() {
		if (isArray) {
			const newValue = newEmpty();
			value = [...value, newValue];
			dispatch('new', newValue);
		} else {
			value = newEmpty();
			dispatch('new', value);
		}
	}
</script>

{#if isArray || !value}
	<Button on:click={fillProp} {disabled}>
		<Label>{text}</Label>
	</Button>
{/if}

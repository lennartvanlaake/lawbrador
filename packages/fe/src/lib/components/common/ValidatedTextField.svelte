<script lang="ts">
import type { ErrorObject } from 'ajv';
import { onMount } from 'svelte';
export let value: string | undefined | null;
export let label: string;
export let errors: ErrorObject[] | undefined = undefined;
onMount(() => {
	if (!value) value = "";
})
</script>
<input type="text" bind:value {label} class:invalid={!!errors} required />
<ol>
{#each errors ?? [] as error }
	<li>{label} { error.message }</li>
{/each }
</ol>

<style>
	.invalid {
		background-color: red;
		color: white;
	}
</style>

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import TextField from '@smui/textfield';
import AddButton from "./AddButton.svelte";
import RemoveButton from "./RemoveButton.svelte";
export let value: string | null = null;
export let label: string;
export let required: boolean = false;
const dispatch = createEventDispatcher();
$: disabled = value === null;
$: disabled ? dispatch('disabled') : dispatch('enabled');
$: if(required && !value) value = "";
function remove() {
	// a required TextField will not accept null as value
	required = false;
	value = null;
}
</script>
<TextField label={label} bind:value disabled={disabled} required={required} />
{#if disabled }
<AddButton bind:value empty={""} />
{:else }
	<RemoveButton bind:value remove={remove}/>
{/if }

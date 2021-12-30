<script lang="ts">
import { createEventDispatcher } from 'svelte';
import TextField from '@smui/textfield';
import AddButton from "./AddButton.svelte";
import RemoveButton from "./RemoveButton.svelte";
export let value: string | null = null;
export let label: string;
const dispatch = createEventDispatcher();
$: disabled = value === null;
$: disabled ? dispatch('disabled') : dispatch('enabled');
</script>

<TextField label={label} bind:value disabled={disabled} />
{#if disabled }
<AddButton bind:value empty={""} />
{:else }
<RemoveButton bind:value />
{/if }

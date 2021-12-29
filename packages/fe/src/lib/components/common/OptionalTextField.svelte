<script lang="ts">
import TextField from '@smui/textfield';
import AddButton from "./AddButton.svelte";
import RemoveButton from "./RemoveButton.svelte";
export let value: string | null = null;
export let label: string;
</script>

{#if value === null }
<TextField label={label} bind:value />
<RemoveButton bind:value />
{:else }
<TextField label={label} bind:value />
<AddButton bind:value empty="" />
{/if }

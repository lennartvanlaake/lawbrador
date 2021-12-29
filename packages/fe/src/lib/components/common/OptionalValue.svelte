<script lang="ts">
import AddButton from "./AddButton.svelte";
import RemoveButton from "./RemoveButton.svelte";
export let value: any | null = null;
export let list: Array<any> | null = null;
export let empty: any;
</script>

<slot name="title" />
{#if value }
	<slot />
	<RemoveButton bind:value bind:list />
{:else if !list }
	<AddButton bind:value empty={empty} />
{/if }

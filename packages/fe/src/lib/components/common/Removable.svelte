<script lang="ts">
	import RemoveButton from './RemoveButton.svelte';
	export let value: any | null | undefined = null;
	export let list: Array<any> | null = null;
</script>

<slot />
<RemoveButton bind:value bind:list />

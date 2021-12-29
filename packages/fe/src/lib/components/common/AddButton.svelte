<script lang="ts">
import Button, { Label } from '@smui/button';
export let toAdd: Array<any> | any;
export let empty: any;
const isArray = Array.isArray(toAdd);

function fillProp() {
	if (isArray) {
		toAdd = [ ...toAdd, empty ]
	} else {
		toAdd = { ...empty }
	}
}
</script>
{#if isArray || !toAdd }
<Button on:click={fillProp}>
	<Label>Add</Label>
</Button>
{/if }



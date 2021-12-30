<script lang="ts">
import Button, { Label } from '@smui/button';
export let value: Array<any> | any;
export let empty: any;
export let text: string = "Add";
const isArray = Array.isArray(value);
function newEmpty() {
	return typeof empty == "object" ? { ...empty } : empty;
}

function fillProp() {
	if (isArray) {
		value = [ ...value, newEmpty() ];
	} else {
		value = newEmpty(); 
	}
}
</script>
{#if isArray || !value }
<Button on:click={fillProp}>
	<Label>{text}</Label>
</Button>
{/if }



<script lang="ts">
import Button, { Label } from '@smui/button';
export let value: any;
export let list: Array<any> | null;
export let text: string = "Remove";
function remove() {
	value = null;
	if (list) {
		list = list.filter(el => el); 
	}
	console.log(list);
	}
</script>
<Button on:click={remove}>
	<Label>{text}</Label>
</Button>



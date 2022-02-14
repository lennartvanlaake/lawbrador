<script lang="ts">
import Button, { Label } from '@smui/button';
export let value: any;
export let list: Array<any> | null = null;
export let text: string = "Remove";
export let remove = () => {
	value = undefined;
	if (list) {
		list = list.filter(el => el); 
	}
	}
</script>
<Button on:click={remove}>
	<Label>{text}</Label>
</Button>



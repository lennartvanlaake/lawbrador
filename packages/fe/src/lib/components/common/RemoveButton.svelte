<script lang="ts">
import Button, { Label } from '@smui/button';
export let toRemove: any;
export let list: Array<any> | null;
function remove() {
	toRemove  = null	
	if (list) {
		list = list.filter(el => el); 
	}
}
</script>
<Button on:click={remove}>
	<Label>Remove</Label>
</Button>



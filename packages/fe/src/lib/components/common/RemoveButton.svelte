<script lang="ts">
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
<button on:click={remove}>
	{text}
</button>



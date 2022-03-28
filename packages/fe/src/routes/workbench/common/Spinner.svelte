<script lang="ts">
	import View from '$lib/components/workbench/View.svelte';
	import Spinner from '$lib/components/common/Spinner.svelte';
</script>

<View name="only the spinner">
	<Spinner />
</View>
<View name="big spinner">
	<h1>
		<Spinner />
		<h1 />
	</h1></View
>

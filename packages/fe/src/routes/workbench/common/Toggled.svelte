<script lang="ts">
	import View from '$lib/components/workbench/View.svelte';
	import Toggled from '$lib/components/common/Toggled.svelte';
	const empty = 'empty state';
	let data = 'initial';
</script>

<View name="Basic string">
	<Toggled>
		<p>hoi</p>
	</Toggled>
</View>
<View name="With bound data">
	<Toggled value={data} {empty}>
		<p>{data}</p>
	</Toggled>
</View>

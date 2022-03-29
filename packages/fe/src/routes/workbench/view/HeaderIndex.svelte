<script lang="ts">
	import View from '$lib/components/workbench/View.svelte';
	import { defaultRestructure } from '@lawbrador/shared';
	import HeaderIndex from '$lib/components/view/HeaderIndex.svelte';
	let headers =
		defaultRestructure(
			'<h1>1 bla</h1><h2>1.1 die</h2><h3>1.1.1 nogiets</h3><h3>1.1.2 dingen</h3><h2>1.2 iets</h2><h1>3 bla</h1>'
		).children ?? [];
	console.log(headers);
</script>

<View name="filled index">
	<HeaderIndex {headers} show={true} />
</View>

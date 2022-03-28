<script lang="ts">
	import View from '$lib/components/workbench/View.svelte';
	import TooltipButton from '$lib/components/common/TooltipButton.svelte';
	const explanation = 'very explanatory explanation of the things';
	let data = 'initial';
</script>

<View name="Basic string">
	<div>
		<TooltipButton tooltipText={explanation} />
	</div>
</View>

<style>
	div {
		height: 300px;
		width: 300px;
	}
</style>

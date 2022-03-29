<script lang="ts">
	import Collapsable from '$lib/components/common/Collapsable.svelte';
</script>

<Collapsable>
	<h3 slot="title">Hoi</h3>
	Allemaal gave tekst
	<Collapsable>
		<h3 slot="title">Hee</h3>
		Gave child-text
	</Collapsable>
</Collapsable>

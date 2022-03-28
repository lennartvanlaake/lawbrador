<script lang="ts">
	import View from '$lib/components/workbench/View.svelte';
	import SourceConfigEditor from '$lib/components/page/SourceConfigEditor.svelte';
	import { EMPTY_SOURCE_CONFIG, eurlexConfig } from '@lawbrador/shared';
	let empty = { sourceConfigs: [] };
	let eurlex = { sourceConfig: eurlexConfig, sourceConfigs: [eurlexConfig] };
</script>

<View name="Empty">
	<SourceConfigEditor properties={empty} />
</View>
<View name="Eurlex">
	<SourceConfigEditor properties={eurlex} />
</View>

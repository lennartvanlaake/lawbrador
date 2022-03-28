<script lang="ts">
	import View from '$lib/components/workbench/View.svelte';
	import EditableSourceConfig from '$lib/components/config/EditableSourceConfig.svelte';
	import { EMPTY_SOURCE_CONFIG, eurlexConfig } from '@lawbrador/shared';
</script>

<View name="Empty">
	<EditableSourceConfig sourceConfig={EMPTY_SOURCE_CONFIG} />
</View>
<View name="Eurlex">
	<EditableSourceConfig sourceConfig={eurlexConfig} />
</View>

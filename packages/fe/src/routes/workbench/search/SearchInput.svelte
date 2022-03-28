<script lang="ts">
	import SearchInput from '$lib/components/search/SearchInput.svelte';
	import View from '$lib/components/workbench/View.svelte';
	import { eurlexConfig } from '@lawbrador/shared';
</script>

<View name="empty">
	<SearchInput />
</View>
<View name="eurlex">
	<SearchInput sourceConfig={eurlexConfig} />
</View>
<View name="filled query (NB: this should submit immediately and give an error message)">
	<SearchInput sourceConfig={eurlexConfig} />
</View>

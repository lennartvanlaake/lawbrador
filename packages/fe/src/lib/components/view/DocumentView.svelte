<script lang="ts">
	import type { RestructuredDocument } from '@lawbrador/shared';
	import NodeView from './NodeView.svelte';
	export let document: RestructuredDocument
</script>
<a href={document.url}>Original</a>
<NodeView node={document.body}></NodeView>

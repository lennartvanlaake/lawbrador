<script lang="ts">
	import type { RestructuredDocument } from '@lawbrador/shared';
	import { renderNode } from '@lawbrador/shared';
	import HighlightControl from './HighlightControl.svelte';
	import NodeView from './NodeView.svelte';
	export let document: RestructuredDocument;
	let html = renderNode(document.body);
</script>

<a href={document.url}>Original</a>
<NodeView {html} />
<HighlightControl bind:html />

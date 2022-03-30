<script lang="ts">
	import type { RestructuredDocument } from '@lawbrador/shared';
	import { renderNode } from '@lawbrador/shared';
	import BottomToolBar from './BottomToolBar.svelte';
	import NodeView from './NodeView.svelte';
	export let document: RestructuredDocument;
	let documentElement: Element;
	let html = renderNode(document.body);
</script>

<a href={document.url}>Original</a>
<div bind:this={documentElement}>
	<NodeView {html} />
</div>
<BottomToolBar node={document.body} bind:html {documentElement} />

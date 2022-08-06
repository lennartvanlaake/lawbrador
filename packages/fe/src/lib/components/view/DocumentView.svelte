<script lang="ts">
	import type { Annotation, RestructuredDocument } from '@lawbrador/shared';
	import { RenderedDocument, nodeToTextAndTags } from '@lawbrador/shared';
	import BottomToolBar from './BottomToolBar.svelte';
	import NodeView from './NodeView.svelte';
	export let document: RestructuredDocument;
	let documentElement: HTMLElement;
	let renderedDocument = new RenderedDocument(nodeToTextAndTags(document.body), document.reference);
	let html = renderedDocument.htmlString;
	function setHtml(ev: CustomEvent<string>) {
		html = ev.detail;
	}
</script>

<a href={document.reference.url}>Original</a>
<div bind:this={documentElement}>
	<NodeView {html} />
</div>
<BottomToolBar
	node={document.body}
	bind:renderedDocument
	{documentElement}
	on:htmlChanged={setHtml}
/>

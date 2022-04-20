<script lang="ts">
	import type { RestructuredDocument } from '@lawbrador/shared';
	import { RenderedDocument, nodeToTextAndTags } from '@lawbrador/shared';
	import BottomToolBar from './BottomToolBar.svelte';
	import NodeView from './NodeView.svelte';
	export let document: RestructuredDocument;
	let documentElement: Element;
	let renderedDocument = new RenderedDocument(nodeToTextAndTags(document.body));
</script>

<a href={document.url}>Original</a>
<div bind:this={documentElement}>
	<NodeView html={renderedDocument.toHtmlString()} />
</div>
<BottomToolBar node={document.body} bind:renderedDocument {documentElement} />

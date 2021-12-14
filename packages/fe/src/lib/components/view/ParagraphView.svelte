
<script lang="ts">
	import type { RestructuredNode} from '@legalthingy/shared/schemas/document_version';
	import NodeView from './NodeView.svelte';
	export let node: RestructuredNode;
</script>

<p>
{#each node.children as child } 
	<NodeView node='{child}' />
{/each }
</p>

<script lang="ts">
	import type { RestructuredNode} from '@lawbrador/shared/src/schemas/document_version';
	import NodeView from './NodeView.svelte';
	export let node: RestructuredNode;
</script>

<div>
{#each node.children as child } 
	<NodeView node='{child}' />
{/each }
</div>

<script lang="ts">
	import type { RestructuredNode} from '@lawbrador/shared/src/schemas/document_version';
	import DivView from './DivView.svelte';
	import PargraphView from './ParagraphView.svelte';
	export let node: RestructuredNode;
</script>


{#if node.name == 'div' }
	<DivView node='{node}' />
{:else if node.name == 'p' } 
	<PargraphView node='{node}' />
{:else }
	{ node.text }
{/if }



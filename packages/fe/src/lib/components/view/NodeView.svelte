<script lang="ts">
	import type { RestructuredNode } from '@lawbrador/shared';
	import { renderNode } from '@lawbrador/shared';
	export let node: RestructuredNode;
	let html = renderNode(node);
</script>

{@html html}

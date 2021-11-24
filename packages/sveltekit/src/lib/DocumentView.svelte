
<script lang="ts">
	import type { Document } from '@legalthingy/parse/src/document_factory';
	import { marked } from 'marked';
	export let document: Document;
</script>
{#if document } 
	{#each document.paragraphs as par}
		{#if par.type == 'paragraph'}
			{#if par.pre}
				<p><span>{par.pre}</span>{@html marked(par.text)}</p>
			{:else}
				<p>{@html marked(par.text)}</p>
			{/if}
		{:else if par.type == 'title'}
			<h2>{@html marked(par.text)}</h2>
		{/if}
	{/each}
{/if }

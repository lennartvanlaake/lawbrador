<script lang="ts">
import Paper, {  Content } from '@smui/paper';
export let messages: string[] | undefined;
</script>
{#if messages }
<Paper color="primary" variant="outlined">
	<Content>
		{#each messages as message } 
			<p>{message}</p>	
		{/each }
	</Content>
</Paper>
{/if }


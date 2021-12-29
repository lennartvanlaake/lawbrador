<script lang="ts">
import type { UrlComponent } from "@lawbrador/shared/src/schemas/rules";
import TextField from '@smui/textfield';
import Paper, { Title, Content } from '@smui/paper';
import OptionalValue from "../common/OptionalValue.svelte";
export let urlComponentConfig: UrlComponent; 
</script>
<Paper>
	<Content>
	<OptionalValue bind:value={urlComponentConfig.value} >
	 
		<TextField bind:value={urlComponentConfig.value} label="Static value" />	
	</OptionalValue>
	<TextField bind:value={urlComponentConfig.variableName} label="Static value" />	
		

	</Content>
</Paper>


<script lang="ts">
import TextField  from '@smui/textfield';
import HelperText from '@smui/textfield/helper-text';
import type { ErrorObject } from 'ajv';
export let value: string;
export let label: string;
export let errors: ErrorObject[] | undefined;
</script>
<TextField bind:value {label} invalid={!!errors}>
	<HelperText validationMsg slot="helper">
	{#each errors ?? [] as error }
		{label} { error.message }	
	{/each }
	</HelperText>
</TextField>

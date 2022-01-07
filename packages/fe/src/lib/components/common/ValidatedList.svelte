<script lang="ts">
import List from '@smui/list';
import Paper, { Title, Content } from '@smui/paper';
import type { ErrorObject } from 'ajv';
import AddButton from './AddButton.svelte';
import { getImprovedErrorMessages } from '$lib/ts/validate';
import WarningBox from './WarningBox.svelte';
export let list: any[];
export let empty: any;
export let errors: ErrorObject[] | undefined;
$: messages = getImprovedErrorMessages(errors, 2, "List");
</script>
<List>
	<slot />
</List>
<AddButton bind:value={list} {empty} />
<WarningBox {messages} />

<script lang="ts">
import type { ErrorObject } from 'ajv';
import AddButton from './AddButton.svelte';
import { getImprovedErrorMessages } from '$lib/ts/validate';
import WarningBox from './WarningBox.svelte';
export let list: any[] | undefined;
export let empty: any;
export let errors: ErrorObject[] | undefined;
$: messages = getImprovedErrorMessages(errors, 2, "List");
</script>
<ul>
	<slot />
</ul>
<AddButton bind:value={list} empty={empty} />
<WarningBox {messages} />

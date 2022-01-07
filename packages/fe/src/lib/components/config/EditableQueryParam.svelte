<script lang="ts">
	import type { QueryParam } from '@lawbrador/shared/src/schemas/rules';
	import { queryParam as schema } from '@lawbrador/shared/src/schemas/rules';
	import { Validator } from '$lib/ts/validate';
	import ValidatedTextField from '$lib/components/common/ValidatedTextField.svelte';
	import EditableUrlComponent from './EditableUrlComponent.svelte';
	export let param: QueryParam;
	const validator = new Validator(schema);
	$: errors = validator.validate(param);
</script>

<ValidatedTextField bind:value={param.name} label="Query param" errors={errors?.name} />
<EditableUrlComponent bind:config={param.urlComponent} />

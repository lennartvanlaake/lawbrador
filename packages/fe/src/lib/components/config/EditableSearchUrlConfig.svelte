<script lang="ts">
	import type { SearchUrlConfig } from '@lawbrador/shared';
	import ValidatedTextField from '../common/ValidatedTextField.svelte';
	import { Validator } from '$lib/ts/validate';
	import { Schemas } from '@lawbrador/shared';
	import EditableUrlConfig from './EditableUrlConfig.svelte';
	export let config: SearchUrlConfig;
	const validator = new Validator(Schemas.searchUrlConfig);
	$: errors = validator.validate(config);
	console.log(config);
</script>

<ValidatedTextField
	label="Query variable"
	bind:value={config.queryVariable}
	errors={errors?.queryVariable}
/>
<ValidatedTextField
	label="Page variable"
	bind:value={config.pageVariable}
	errors={errors?.pageVariable}
/>
<EditableUrlConfig bind:urlConfig={config} />

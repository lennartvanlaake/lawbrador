<script lang="ts">
	import type { UrlConfig } from '@lawbrador/shared';
	import { Schemas } from '@lawbrador/shared';
	import EditableUrlComponent from './EditableUrlComponent.svelte';
	import { EMPTY_URL_COMPONENT, EMPTY_QUERY_PARAM } from '@lawbrador/shared';
	import Removable from '../common/Removable.svelte';
	import { Validator } from '$lib/ts/validate';
	import ValidatedTextField from '$lib/components/common/ValidatedTextField.svelte';
	import ValidatedList from '$lib/components/common/ValidatedList.svelte';
	import EditableQueryParam from './EditableQueryParam.svelte';

	export let urlConfig: UrlConfig;
	const validator = new Validator(Schemas.urlConfig);

	$: errors = validator.validate(urlConfig);
	$: console.log(errors);
</script>

<section>
	<ValidatedTextField bind:value={urlConfig.base} errors={errors?.base} label="Base url" />
	<section>
		<h3>Path components</h3>
		<ValidatedList
			bind:list={urlConfig.pathComponents}
			errors={errors?.pathComponents}
			empty={EMPTY_URL_COMPONENT}
		>
			{#each urlConfig.pathComponents as component}
				<Removable bind:value={component} bind:list={urlConfig.pathComponents}>
					<EditableUrlComponent bind:config={component} />
				</Removable>
			{/each}
		</ValidatedList>
	</section>
	<section>
		<h3>Query components</h3>
		<ValidatedList
			bind:list={urlConfig.queryComponents}
			errors={errors?.queryComponents}
			empty={EMPTY_QUERY_PARAM}
		>
			{#each urlConfig.queryComponents as param}
				<section>
					<Removable bind:value={param} bind:list={urlConfig.queryComponents}>
						<EditableQueryParam bind:param />
					</Removable>
				</section>
			{/each}
		</ValidatedList>
	</section>
</section>

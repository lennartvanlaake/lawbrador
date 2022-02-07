<script lang="ts">
	import type { UrlConfig } from '@lawbrador/shared/src/schemas/rules';
	import { urlConfig as urlConfigSchema } from '@lawbrador/shared/src/schemas/rules';
	import Paper, { Title, Content } from '@smui/paper';
	import EditableUrlComponent from './EditableUrlComponent.svelte';
	import { EMPTY_URL_COMPONENT, EMPTY_QUERY_PARAM } from '@lawbrador/shared/src/examples';
	import Removable from '../common/Removable.svelte';
	import { Validator } from '$lib/ts/validate';
	import ValidatedTextField from '$lib/components/common/ValidatedTextField.svelte';
	import ValidatedList from '$lib/components/common/ValidatedList.svelte';
	import EditableQueryParam from './EditableQueryParam.svelte';

	export let urlConfig: UrlConfig;
	const validator = new Validator(urlConfigSchema);

	$: errors = validator.validate(urlConfig);
	$: console.log(errors);
</script>

<div class="paper-container">
	<ValidatedTextField bind:value={urlConfig.base} errors={errors?.base} label="Base url" />
	<Paper>
		<Title>Path components</Title>
		<Content>
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
		</Content>
	</Paper>
	<Paper>
		<Title>Query components</Title>
		<Content>
			<ValidatedList
				bind:list={urlConfig.queryComponents}
				errors={errors?.queryComponents}
				empty={EMPTY_QUERY_PARAM}
			>
				{#each urlConfig.queryComponents as param}
					<Paper >
						<Content>
							<Removable bind:value={param} bind:list={urlConfig.queryComponents}>
								<EditableQueryParam bind:param />
							</Removable>
						</Content>
					</Paper>
				{/each}
			</ValidatedList>
		</Content>
	</Paper>
</div>

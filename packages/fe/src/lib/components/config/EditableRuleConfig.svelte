<script lang="ts">
import { Validator } from "$lib/ts/validate";
import type { SelectionRule } from "@lawbrador/shared/src/schemas/rules";
import { selectionRule } from "@lawbrador/shared/src/schemas/rules";
import { ALL_SELECTION_OPERATORS, ALL_SELECTION_LOCATIONS } from "@lawbrador/shared/src/schemas/rules";
import Select, { Option } from '@smui/select';
import TextField  from '@smui/textfield';
import HelperText from '@smui/textfield/helper-text';
export let ruleConfig: SelectionRule; 
export let title: string | null;
export let isValid: boolean;
const validator = new Validator(selectionRule);
$: ({ isValid, errorList, errorMap } = validator.validate(ruleConfig));
$: console.log(validator.validate(ruleConfig));
</script>
<div class="columns margins">
<Select bind:value={ruleConfig.op} label="Selection operator">
{#each ALL_SELECTION_OPERATORS as op }
	<Option value={op}>{op}</Option>
{/each}
</Select>

<Select bind:value={ruleConfig.location} label="Selection location">
{#each ALL_SELECTION_LOCATIONS as loc }
	<Option value={loc}>{loc}</Option>
{/each}
</Select>
<TextField bind:value={ruleConfig.value} label="Selector value" invalid={!!errorMap?.value}>
	<HelperText validationMsg slot="helper">
	{#each errorMap?.value ?? [] as error }
		Value { error.message }
	{/each }
	</HelperText>
</TextField>
</div>

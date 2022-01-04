<script lang="ts">
import Ajv, {JSONSchemaType} from "ajv";
import { Type } from "@sinclair/typebox";
import type { TObject } from "@sinclair/typebox";
import Paper, { Title, Content } from '@smui/paper';
import { writable } from 'svelte/store';
export let schema: TObject<any>;
export let title: string | null = null;
export let value: any;
export let bordered =  true; 
const ajv = new Ajv();
const validate = ajv.compile(Type.Strict(schema));
let isValid= validate(value);
let errors= validate.errors;
function runValidation() {
 	isValid = validate(value);
	errors= validate.errors
}
</script>
{#if bordered }
<Paper>
{#if title }
	<Title>
		{ title }	
	</Title>
{/if }
<Content>
	<div on:valueChanged={runValidation}>
		<slot {errors} {isValid} {value} />
	</div>
	</Content>
</Paper>
{:else }
	<div on:valueChanged={runValidation}>
		<slot {errors} {isValid} {value} />
	</div>
{/if }


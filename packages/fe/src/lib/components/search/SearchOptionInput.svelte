<script lang="ts"> 
	import type { UrlComponent } from '@legalthingy/shared/schemas/rules';
	export let option: UrlComponent;
	export let value: string;	
</script>

<strong>{ option.variableName }</strong>
{ #if option.possibleValues } 
	<select bind:value="{value}">
		{ #each option.possibleValues as possibleValue }
			<option value={possibleValue}>{possibleValue}</option>
		{ /each } 
	</select>
{ :else }
	<input type=text bind:value="{value}" />
{ /if } 

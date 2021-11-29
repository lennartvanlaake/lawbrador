

<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { getDocuments } from "$lib/api";
	export const load: Load = async ({ fetch }) => {
		const res = await getDocuments(fetch);
		return { 
			props: {
				documents: res,
			}
		};
	}
</script>


<script lang="ts">
	import axios from 'axios';
	import type { RuleSet, SelectionRule, UrlSelectionRule } from '@legalthingy/shared/schemas/rules';
	import {  SelectionOperator, SelectionLocation } from '@legalthingy/shared/schemas/rules'
	import type { DocumentVersion } from '@legalthingy/shared/schemas/document_version';
	import { applyRuleSet } from '@legalthingy/parse/src/rule_applyer'
	import DocumentView from '$lib/DocumentView.svelte';
	export let documents: any[];
	$: console.log(documents);
	let url = '';
	let urlSelectionRule: UrlSelectionRule = {
		op: SelectionOperator.Includes,
		value: ""
	};
	let bodyRule: SelectionRule = {
		op: SelectionOperator.Includes,
		location: SelectionLocation.Id,
		value: ""
	}
	let bodyRuleOpString: keyof typeof SelectionOperator;
	let bodyRuleLocationString: keyof typeof SelectionLocation;
	let ruleSet: RuleSet = {
		urlRules: urlSelectionRule,  
		bodyRule: bodyRule
	};
	let scrapeResult: DocumentVersion;
	let parsed: DocumentVersion;
	async function preview() {
		const scrapeRequest = { url: url };
		scrapeResult = (await axios.post('/api/scrape', scrapeRequest)).data;
		parsed = scrapeResult;
		console.log(scrapeResult);
	}

	function refresh(doc, ruleSet) {
		const parseResult = applyRuleSet(scrapeResult, ruleSet);
		if (!parseResult.textRootNode) {
			alert("Parse failed!");
			return;
		}
		parsed = parseResult;
	}
</script>

<h1>Current documents</h1>
{ #each documents as doc }
	<p><a href="/document/{doc._id}">{doc._id}</a></p>
{/each }

<h1>Adjust rule here!</h1>
<label for="body-value">Value</label>
<textarea id="body-value" bind:value={bodyRule.value} />

<h1>Insert url here!</h1>
<textarea id="text-field" bind:value={url} />
<button on:click={preview}>preview</button>
<button on:click={() => refresh(scrapeResult, ruleSet)}>apply rule</button>
{#if scrapeResult}
	<DocumentView document={parsed}></DocumentView>
{/if}

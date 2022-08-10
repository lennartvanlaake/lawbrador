<script lang="ts">
	import { id, Marking, RenderedDocument } from '@lawbrador/shared';

	import { createEventDispatcher, onMount } from 'svelte';

	import Modal from '../common/Modal.svelte';

	export let showMarkingMakerModal;
	export let selection: Selection | null;
	export let renderedDocument: RenderedDocument;
	export let selectedMarking: Marking | null;
	let description = '';
	onMount(() => {
		if (selection == null) {
			showMarkingMakerModal = false;
		}
	});
	const markingAdded = createEventDispatcher<{ markingAdded: Marking }>();
	const markingEdited = createEventDispatcher<{ markingEdited: Marking }>();
	const markingDeleted = createEventDispatcher<{ markingDeleted: Marking }>();

	function deleteMarking() {
		markingDeleted('markingDeleted', {
			...selectedMarking!!
		});
		selectedMarking = null;
		showMarkingMakerModal = false;
	}
	function editMarking() {
		markingEdited('markingEdited', {
			...selectedMarking!!
		});
		selectedMarking = null;
		showMarkingMakerModal = false;
	}

	function markSelection() {
		if (selection == null) {
			showMarkingMakerModal = false;
		}
		const positions = renderedDocument.positionsFromSelection(selection!!);
		const markingId = id();
		console.log(description);
		markingAdded('markingAdded', {
			...positions,
			_id: markingId,
			description: description,
			documentReference: renderedDocument.reference
		});
		showMarkingMakerModal = false;
	}
</script>

<Modal closable={true} bind:show={showMarkingMakerModal}>
	{#if !selectedMarking}
		<h3>Do you wish to highlight the following text?</h3>
		<em>{document.getSelection()?.toString()}</em>
		<div>
			<label for="description">Add your comment</label>
		</div>
		<textarea id="description" bind:value={description} />
		<div>
			<button on:click={markSelection}>Yes</button><button
				on:click={() => (showMarkingMakerModal = false)}>No</button
			>
		</div>
	{:else}
		<h3>Edit the description</h3>
		<textarea id="description" bind:value={selectedMarking.description} />
		<div>
			<button on:click={editMarking}>Yes</button><button
				on:click={() => (showMarkingMakerModal = false)}>No</button
			>
			<button id="delete" on:click={deleteMarking}>Delete</button>
		</div>
	{/if}
</Modal>

<style>
	#delete {
		background-color: red;
	}
</style>

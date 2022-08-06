<script lang="ts">
	import { id, Marking, RenderedDocument } from '@lawbrador/shared';

	import { createEventDispatcher, onMount } from 'svelte';

	import Modal from '../common/Modal.svelte';

	export let showMarkingMakerModal;
	export let selection: Selection | null;
	export let renderedDocument: RenderedDocument;
    let description = "";
	onMount(() => {
		if (selection == null) {
			showMarkingMakerModal = false;
		}
	});
	const eventDispatcher = createEventDispatcher<{ markingAdded: Marking }>();

	function markSelection() {
		if (selection == null) {
			showMarkingMakerModal = false;
		}
		const positions = renderedDocument.positionsFromSelection(selection!!);
		const markingId = id();
        console.log(description);
		eventDispatcher('markingAdded', {
			...positions,
			_id: markingId,
            description: description,
			documentReference: renderedDocument.reference
		});
		showMarkingMakerModal = false;
	}
</script>

<Modal closable={true} bind:show={showMarkingMakerModal}>
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
</Modal>

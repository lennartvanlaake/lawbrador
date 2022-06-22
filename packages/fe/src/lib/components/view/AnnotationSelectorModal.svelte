<script lang="ts">
    import { newAnnotation, getAnnotations } from '$lib/ts/api';
    import { onMount } from 'svelte'; 
    import type { Annotation } from '@lawbrador/shared'
    import Modal from '../common/Modal.svelte';
    import { each } from 'svelte/internal';
    export let annotation: Annotation | null = null;

    let show: boolean = true;
    let existingAnnotations: Annotation[] = [];
    let selectedOldAnnotationId: String;
    let name: string | null = null;
    
    onMount(async () => {
        existingAnnotations = await getAnnotations();
    })

    const selectOld = () => {
        annotation = existingAnnotations.find(it => it._id == selectedOldAnnotationId)!
    }

    const selectNew = async () => {
        if (!name) {
            alert("Please fill in a name")
            return
        }
        const id = await newAnnotation({ name: name!!, markings: []})
        annotation = {
            _id: id._id,
            name: name!!,
            markings: []
        }
    } 
</script>


<Modal closable={true} bind:show={show}>
    <h3>Add to existing annotation</h3>
    <section>
       <select bind:value={selectedOldAnnotationId} on:change={selectOld}>
            { #each existingAnnotations as it }
                <option value={it._id}>{it.name}</option>
            { /each }
        </select> 
    </section>

    <h3>Create new annotation</h3>
    <section>
        <h4>Annotation name</h4>
        <input type="text" bind:value={name} /> 
        <button on:click={selectNew}>Select</button>
    </section>    
</Modal>
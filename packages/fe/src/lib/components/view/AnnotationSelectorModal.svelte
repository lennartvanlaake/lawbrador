<script lang="ts">
    import { Annotation, id } from '@lawbrador/shared'
    import Modal from '../common/Modal.svelte';
    export let annotation: Annotation | null = null;
    let show: boolean = true;
    let name: string | null = null;    
    const select = () => {
        if (!name) {
            alert("Please fill in a name")
            return
        }
        annotation = {
            id: id(),
            name: name!!,
            markings: []
        }
    } 
</script>


<Modal closable={true} bind:show={show}>
    <h4>Annotation name</h4>
    <input type="text" bind:value={name} /> 
    <button on:click={select}>Select</button>
</Modal>
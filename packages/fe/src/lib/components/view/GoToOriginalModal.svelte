<script lang="ts">
  export let link: string;
</script>

<div id="background">
	<div id="content">
	<h3>Could not parse document text</h3>
	<p>
View the original on the source site or go back?
	</p>
	<button on:click={() => window.location.href = link}>
To original
	</button>
	<button on:click={() => history.back()}>
	Back
	</button>
	</div>
</div>
<style>

#background {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

#content {
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
  background-color: white;
}
</style>

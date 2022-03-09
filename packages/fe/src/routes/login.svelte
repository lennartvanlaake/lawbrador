<script lang="ts">
	import { exchangePasswordForJwt } from '$lib/ts/api';
	let password = "";
	async function processLogin() {
		try {
			const { jwt } = await exchangePasswordForJwt({ password: password });
			localStorage.setItem("jwt", jwt); 
			location.replace("/");
		} catch (e) {
			console.error(e);
			alert(e.message);
		}
	}
</script>


<h3>Password:</h3>
<form>
	<input type="password" bind:value={password} />
	<button on:click={processLogin}>Login</button>
</form>

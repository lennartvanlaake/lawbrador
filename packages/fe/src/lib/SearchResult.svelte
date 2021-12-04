<script lang="ts">
import { setCurrentResult } from "./store";
export let text = "";
export let link = "";
function onClick() {
	setCurrentResult({ text: text, link: link });
	document.location.replace("/document");
}
</script>

<p>
<a href="/document" on:click|preventDefault="{onClick}">{text}</a>
</p>

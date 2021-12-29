<script lang="ts">
import TextField from '@smui/textfield';
import type { UrlConfig } from "@lawbrador/shared/src/schemas/rules";
export let urlConfig: UrlConfig;
</script>


<TextField bind:value={urlConfig.base} label="Base url" />


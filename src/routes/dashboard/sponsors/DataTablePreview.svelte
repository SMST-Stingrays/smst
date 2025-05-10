<script lang="ts">
	import { Image } from '@unpic/svelte';

	export let url: string;
</script>

<div class="max-w-sm">
	<Image width={300} class="rounded-lg overflow-hidden" src={url} alt="Preview of {url}" />
</div>
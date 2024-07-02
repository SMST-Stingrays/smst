<script lang="ts">
	import { Image } from '@unpic/svelte';

	export let url;
	export let alt;
	export let src: string;
</script>

<div class="container grid grid-cols-5 gap-4">
	<Image class="col-span-2 h-64 overflow-hidden rounded" src={url} {alt} />
	<p class="col-span-3 leading-7">{src}</p>
</div>

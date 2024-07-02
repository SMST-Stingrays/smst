<script lang="ts">
	import { Image } from '@unpic/svelte';

	export let url;
	export let alt;
	export let heroText;
</script>

<div class="relative">
	<Image class="h-32 overflow-hidden blur-sm brightness-50" src={url} {alt} />
	<div class="w-full absolute top-0 left-0 text-center mt-10">
		<h1 class="text-2xl font-bold m-auto left-4 top-8">{heroText}</h1>
	</div>
</div>

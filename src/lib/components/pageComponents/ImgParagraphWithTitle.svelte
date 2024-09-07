<script lang="ts">
	import { Image } from '@unpic/svelte';

	export let url;
	export let alt;
	export let side: string;
	export let title: string;
	export let src: string;
</script>

<div class="container flex flex-row gap-7">
	{#if side === "left"}
		<div class="flex-1">
			<Image class="col-span-2 h-64 overflow-hidden rounded" src={url} {alt} />
		</div>
	{/if}
	<div class="flex-1 col-span-3 {side === 'left' ? 'text-left' : 'text-right'}">
		<h2 class="text-primary font-bold text-2xl">{title}</h2>
		<p class="leading-7">{src}</p>
	</div>
	{#if side === "right"}
		<div class="flex-1">
			<Image class="col-span-2 h-64 overflow-hidden rounded" src={url} {alt} />
		</div>
	{/if}
</div>

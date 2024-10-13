<script lang="ts">
	import { Image } from '@unpic/svelte';

	export let url;
	export let alt;
	export let side: string;
	export let title: string;
	export let src: string;
</script>

<div class="container">
	<div class="flex flex-row gap-7">
		<div class="flex flex-1 flex-col {side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-7">
			<div class="flex-1">
				<Image class="col-span-2 overflow-hidden rounded" src={url} {alt} />
			</div>
			<div class="timelineItem flex-1 col-span-3 {side === 'left' ? 'md:text-left' : 'md:text-right'}">
				<h2 class="text-primary font-bold text-2xl">{title}</h2>
				<p class="leading-7">{src}</p>
			</div>
		</div>
	</div>
</div>

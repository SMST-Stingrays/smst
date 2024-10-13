<script lang="ts">
	import { Image } from '@unpic/svelte';

	export let url;
	export let alt;
	export let side: string;
	export let title: string;
	export let src: string;
	export let date: string;
</script>

<div class="container">
	<div class="flex flex-row gap-7">
		<div class="flex flex-1 flex-col {side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-7">
			<div class="flex-1">
				<Image class="col-span-2 overflow-hidden rounded" src={url} {alt} />
			</div>
			<div class="hidden md:flex flex-col align-middle justify-center items-center">
				<span class="w-6 h-6 rounded-full bg-muted"></span>
				<span class="w-1 h-full -my-1 rounded-full bg-muted"></span>
			</div>
			<div class="timelineItem flex-1 col-span-3 {side === 'left' ? 'md:text-left' : 'md:text-right'}">
				<h4 class="text-muted-foreground text-sm">{date}</h4>
				<h2 class="text-primary font-bold text-2xl">{title}</h2>
				<p class="leading-7">{src}</p>
			</div>
		</div>
	</div>
</div>

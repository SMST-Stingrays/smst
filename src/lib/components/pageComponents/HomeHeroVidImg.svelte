<script lang="ts">
	import { Image } from '@unpic/svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { VideoIcon } from 'lucide-svelte';
	import * as Dialog from "$lib/components/ui/dialog";
	import { cn } from '$lib/utils';

	export let imgSrc: string;
	export let vidSrc: string;
	export let headerText: string;
	export let buttonText: string;
</script>

<div class="relative">
	<Image src={imgSrc} alt="Hero image" class="h-screen brightness-90" />
	<h1 class="text-3xl font-bold drop-shadow-[0_0.2px_2.2px_rgba(0,0,0,0.8)] absolute top-4 left-0 right-0 mx-auto text-center">{headerText}</h1>
	<Dialog.Root>
		<Dialog.Trigger class={cn(buttonVariants(), "absolute border-yellow-700 border-2 left-0 right-0 mx-auto text-center bottom-24 drop-shadow-[0_0.2px_2.2px_rgba(0,0,0,0.8)]")}>
			<VideoIcon class="w-4 h-4 mr-2" />
			{buttonText}
		</Dialog.Trigger>
		<Dialog.Content class="w-screen md:min-w-[50vw]">
			<Dialog.Header>
				<Dialog.Title>{buttonText}</Dialog.Title>
			</Dialog.Header>
			<div class="w-screen md:w-[50vw]">
				<!-- eslint-disable-next-line -->
				{@html vidSrc}
			</div>
		</Dialog.Content>
	</Dialog.Root>
</div>
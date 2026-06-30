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
	<Image src={imgSrc} alt="Hero image" class="w-screen brightness-90" />
	<h1 class="text-3xl font-bold drop-shadow-[0_0.2px_2.2px_rgba(0,0,0,0.8)] absolute top-4 left-0 right-0 mx-auto text-center">{headerText}</h1>
</div>

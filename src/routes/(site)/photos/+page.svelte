<script lang="ts">
	import type { PageData } from './$types';
	import { Image } from '@unpic/svelte';
	import Divider from '$lib/components/Divider.svelte';
	export let data: PageData;
	import * as Dialog from "$lib/components/ui/dialog";
</script>

<div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
	<div>
		<div class="text-center pt-7 bg-blue-900">
			<h1 class="text-2xl z-50 font-bold m-auto">Photos</h1>
		</div>
		<div class="text-blue-900 relative h-20">
			<div class="absolute top-0 h-16 w-full overflow-hidden leading-0">
				<Divider class="absolute bottom-0" />
			</div>
		</div>
	</div>
	<div class="container">
		<div class="columns-3 gap-6">
			{#each data.photos as photo}
				<Dialog.Root>
					<Dialog.Trigger>
						<Image alt={photo.title} class="rounded-md mb-6 hover:scale-[1.02] transition" src={photo.url} />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>{photo.title}</Dialog.Title>
						</Dialog.Header>

						<Image alt={photo.title} class=" rounded-md mb-6 transition" src={photo.url} />

						<p><b>Filename:</b> {photo.title}</p>
						<p><b>Uploaded:</b> {photo.createdAt}</p>
						<p><b>File ID:</b> {photo.id}</p>

					</Dialog.Content>
				</Dialog.Root>
			{/each}
		</div>
	</div>
</div>
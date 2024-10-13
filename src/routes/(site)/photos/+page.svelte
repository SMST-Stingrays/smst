<script lang="ts">
	import type { PageData } from './$types';
	import { Image } from '@unpic/svelte';
	import Divider from '$lib/components/Divider.svelte';
	import * as Dialog from "$lib/components/ui/dialog";
	import { IMAGE_TRANSFORM_PREFIX } from '$lib/dynamicSlot';

	export let data: PageData;
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
		<div class="hidden md:grid grid-cols-3 gap-6">
				{#each data.cols as col}
					<div class="flex flex-col">
					{#each col as photo}
						<Dialog.Root>
							<Dialog.Trigger>
								<Image background={photo.bh} width={photo.w} height={photo.h} alt={photo.photo.title} class="rounded-md mb-6 hover:scale-[1.02] transition" src="{IMAGE_TRANSFORM_PREFIX}{photo.photo.url}" />
							</Dialog.Trigger>
							<Dialog.Content>
								<Dialog.Header>
									<Dialog.Title>{photo.photo.title}</Dialog.Title>
								</Dialog.Header>

								<Image background={photo.bh} width={photo.w} height={photo.h} alt={photo.photo.title} class=" rounded-md mb-6 transition" src="{IMAGE_TRANSFORM_PREFIX}{photo.photo.url}" />

								<p><b>Filename:</b> {photo.photo.title}</p>
								<p><b>Uploaded:</b> {photo.photo.createdAt}</p>
								<p><b>File ID:</b> {photo.photo.id}</p>

							</Dialog.Content>
						</Dialog.Root>
					{/each}
					</div>
				{/each}
		</div>
		<div class="flex md:hidden flex-col gap-6 flex-wrap">
			{#each data.photos2 as photo}
				<Dialog.Root>
					<Dialog.Trigger>
						<Image background={photo.bh} width={photo.w} height={photo.h} alt={photo.photo.title} class="rounded-md mb-6 hover:scale-[1.02] transition" src="{IMAGE_TRANSFORM_PREFIX}{photo.photo.url}" />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>{photo.photo.title}</Dialog.Title>
						</Dialog.Header>

						<Image background={photo.bh} width={photo.w} height={photo.h} alt={photo.photo.title} class="rounded-md mb-6 transition" src="{IMAGE_TRANSFORM_PREFIX}{photo.photo.url}" />

						<p><b>Filename:</b> {photo.photo.title}</p>
						<p><b>Uploaded:</b> {photo.photo.createdAt}</p>
						<p><b>File ID:</b> {photo.photo.id}</p>

					</Dialog.Content>
				</Dialog.Root>
			{/each}
		</div>
		<p>It seems you've ran out of photos! Check back another time.</p>
	</div>
</div>
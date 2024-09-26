<script lang="ts">
	import DataTable from './DataTable.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { Media } from '@prisma/client';
	import * as Dialog from "$lib/components/ui/dialog";
	import { toast } from 'svelte-sonner';
	import CreateForm from './CreateForm.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { FormSchema } from './schema';

	export let data: Media[];
	export let form: SuperValidated<Infer<FormSchema>>;

	export let createOpen: boolean;
</script>

{#if data.length === 0}
	<div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
		<div class="flex flex-col items-center gap-1 text-center py-10">
			<h3 class="text-2xl font-bold tracking-tight">There is no media :(</h3>
			<p class="text-sm text-muted-foreground">Why don't you add some?</p>
			<Button
				on:click={() => {
					createOpen = true;
				}}
				class="mt-4">Upload Media</Button
			>
		</div>
	</div>
{:else}
	<DataTable data={data} />
{/if}

<Dialog.Root bind:open={createOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Upload new media</Dialog.Title>
			<Dialog.Description>
				Media will automatically be uploaded to the content bucket and a URL will be generated. Media CANNOT be edited. You must delete it and upload new media in it's place.
			</Dialog.Description>
		</Dialog.Header>
		<CreateForm
			onSubmit={async () => {
				createOpen = false;
				toast.success('Media uploaded successfully!');
			}}
			data={form}
		/>
	</Dialog.Content>
</Dialog.Root>

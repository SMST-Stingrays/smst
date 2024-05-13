<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import type { PageData } from "./$types";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import CreateForm from './CreateForm.svelte';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	let createOpen = false;
</script>

{#if data.pages.length === 0}
	<div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
		<div class="flex flex-col items-center gap-1 text-center">
			<h3 class="text-2xl font-bold tracking-tight">There are no pages :(</h3>
			<p class="text-sm text-muted-foreground">
				Why don't you create one?
			</p>
			<Dialog.Root bind:open={createOpen}>
				<Dialog.Trigger class={buttonVariants() + " mt-4"}>Create Page</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Create new page</Dialog.Title>
						<Dialog.Description>
							The editor will open once you're finished.
						</Dialog.Description>
					</Dialog.Header>
					<CreateForm onSubmit={() => {createOpen = false; toast.success("New page created successfully!")}} data={data.form} />
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
{/if}
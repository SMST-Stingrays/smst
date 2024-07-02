<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import type { PageData } from './$types';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import CreateForm from './CreateForm.svelte';
	import { toast } from 'svelte-sonner';
	import DataTable from './DataTable.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	let createOpen = false;
</script>

<div class="flex items-center justify-between">
	<h1 class="text-lg font-semibold md:text-2xl">{$page.data.title}</h1>
	{#if data.policies.length !== 0}
		<Button
			on:click={() => {
				createOpen = true;
			}}>Create</Button
		>
	{/if}
</div>

{#if data.policies.length === 0}
	<div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
		<div class="flex flex-col items-center gap-1 text-center">
			<h3 class="text-2xl font-bold tracking-tight">There are no policies :(</h3>
			<p class="text-sm text-muted-foreground">Why don't you add one?</p>
			<Button
				on:click={() => {
					createOpen = true;
				}}
				class="mt-4">Add Policy</Button
			>
		</div>
	</div>
{:else}
	<DataTable fData={data.updateForm} data={data.policies} />
{/if}

<Dialog.Root bind:open={createOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add new policy</Dialog.Title>
			<Dialog.Description>
				Make sure your link is visible to the public. Preferably, a PDF document uploaded to the
				content bucket, to ensure proper global reachability.
			</Dialog.Description>
		</Dialog.Header>
		<CreateForm
			onSubmit={async () => {
				createOpen = false;
				toast.success('New policy added successfully!');
			}}
			data={data.form}
		/>
	</Dialog.Content>
</Dialog.Root>

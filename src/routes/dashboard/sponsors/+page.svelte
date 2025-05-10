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
	import * as Alert from "$lib/components/ui/alert";

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
			<h3 class="text-2xl font-bold tracking-tight">There are no sponsors :(</h3>
			<p class="text-sm text-muted-foreground">Why don't you add one?</p>
			<Button
				on:click={() => {
					createOpen = true;
				}}
				class="mt-4">Add Sponsor</Button
			>
		</div>
	</div>
{:else}
	<DataTable fData={data.updateForm} data={data.policies} />
{/if}

<Dialog.Root bind:open={createOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add new sponsor</Dialog.Title>
			<Dialog.Description>
				Make sure your logo link is visible to the public. Preferably, an image document uploaded to the
				content bucket, to ensure proper global reachability.
			</Dialog.Description>
		</Dialog.Header>
		<Alert.Root class="bg-zinc-900">
			<Alert.Title>Need to upload a file?</Alert.Title>
			<Alert.Description>Use the builtin file storage to store your policies. Save it as an image, then upload it to the <b>Media</b> tab in the dashboard. Click the three dots and then <u>Copy Media URL</u> to get a link you can paste below or share on social media!</Alert.Description>
		</Alert.Root>
		<CreateForm
			onSubmit={async () => {
				createOpen = false;
				toast.success('New sponsor added successfully!');
			}}
			data={data.form}
		/>
	</Dialog.Content>
</Dialog.Root>

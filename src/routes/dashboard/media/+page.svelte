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
	import * as Tabs from "$lib/components/ui/tabs";
	import MediaTab from './MediaTab.svelte';

	export let data: PageData;

	let createOpen = false;
	let currentTab = "galleryPhoto";
</script>

<div class="flex items-center justify-between">
	<h1 class="text-lg font-semibold md:text-2xl">{$page.data.title}</h1>
		<Button
			on:click={() => {
				createOpen = true;
			}}>Upload</Button
		>
</div>

<Tabs.Root bind:value={currentTab}>
	<Tabs.List class="grid w-full grid-cols-3">
		<Tabs.Trigger value="galleryPhoto">Gallery Photo</Tabs.Trigger>
		<Tabs.Trigger value="photo">Site Photo</Tabs.Trigger>
		<Tabs.Trigger value="policy">Policy</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="galleryPhoto">
		<MediaTab bind:createOpen data={data.media.galleryPhoto} form={data.form} />
	</Tabs.Content>
	<Tabs.Content value="photo">
		<MediaTab bind:createOpen data={data.media.photo} form={data.form} />
	</Tabs.Content>
	<Tabs.Content value="policy">
		<MediaTab bind:createOpen data={data.media.policy} form={data.form} />
	</Tabs.Content>
</Tabs.Root>

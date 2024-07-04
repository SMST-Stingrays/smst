<script lang="ts">
	import { page } from '$app/stores';
	import * as Alert from "$lib/components/ui/alert";
	import { CircleAlertIcon, DownloadIcon, UploadIcon, XIcon } from 'lucide-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Card from "$lib/components/ui/card";
	import type { PageData } from "./$types";
	import type { Backup } from '$lib/backup';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { goto, invalidateAll } from '$app/navigation';

	export let data: PageData;

	let exportOpen = false;
	let importOpen = false;

	let consequencesUnderstood = false;
	let consequencesUnderstoodTwo = false;
	let iWantToProceed = false;

	$: allowImport = consequencesUnderstood && consequencesUnderstoodTwo && iWantToProceed;

	let fileInput;
	let files: FileList;

	let backup: Backup | null = null;

	async function loadBackup(files: FileList) {
		if (files && files.item(0)) {
			let file = files.item(0);
			if (!file) {
				backup = null;
				return;
			}
			let j = await file.text();
			const obj = JSON.parse(j);
			backup = <Backup>obj;
		} else {
			backup = null;
			return;
		}
	}
	$: loadBackup(files);

	async function performImport() {
		if (!backup) {
			return;
		}
		let req = new URLSearchParams();
		req.set("d", JSON.stringify(backup));
		await fetch("?/import", {
			method: "POST",
			body: req.toString(),
			headers: {
				"Content-Type":"application/x-www-form-urlencoded"
			}
		});
		await invalidateAll();
		await goto("/");
	}
</script>

<div class="flex items-center justify-between">
	<h1 class="text-lg font-semibold md:text-2xl">{$page.data.title}</h1>
</div>

<p>You can use the following backup file to keep a secure, offline copy of all of the site's data. You can also import the backup from this page.</p>
<Alert.Root class="bg-red-900">
	<CircleAlertIcon class="h-4 w-4" />
	<Alert.Title>Sensitive Data</Alert.Title>
	<Alert.Description>
		The backup file contains sensitive data. Store it in a secure location and share only with trusted parties.
	</Alert.Description>
</Alert.Root>

<div>
	<Dialog.Root bind:open={exportOpen}>
		<Dialog.Trigger class={buttonVariants()}>
			<DownloadIcon class="mr-2 h-4 w-4" />
			Export
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Data Export</Dialog.Title>
				<Dialog.Description>REMINDER: This export contains sensitive data. Store it only in a secure location and share only with trusted parties.</Dialog.Description>
			</Dialog.Header>
			<pre class="mb-4 pl-4 mt-6 max-h-64 overflow-x-auto rounded-lg border bg-zinc-900 py-4">{JSON.stringify(data.backup, null, 2)}</pre>
			<Dialog.Footer>
				<Button href="data:text/json;charset=utf-8,{encodeURIComponent(JSON.stringify(data.backup))}" download="smst_backup_{new Date().getTime()}.json">
					<DownloadIcon class="mr-2 h-4 w-4"/>
					Download JSON
				</Button>
				<Button on:click={() => {exportOpen = false;}} variant="secondary">
					<XIcon class="mr-2 h-4 w-4" />
					Close
				</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>

	<Dialog.Root bind:open={importOpen}>
		<Dialog.Trigger class={buttonVariants()}>
			<UploadIcon class="mr-2 h-4 w-4" />
			Import
		</Dialog.Trigger>
		<Dialog.Content class="max-w-lg">
			<Dialog.Header>
				<Dialog.Title>Data Import</Dialog.Title>
				<Dialog.Description>Upload the <pre class="inline relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">smst_backup_XXXXXXXXXX.json</pre> file you downloaded.</Dialog.Description>
			</Dialog.Header>

			<div class="space-y-2 max-w-md mx-auto">
				<div class="space-y-2">
					<label for="file-input" class="text-sm font-medium leading-none">File Upload</label>
					<input bind:this={fileInput} class="pt-1.5 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-destructive [&>span]:line-clamp-1 data-[placeholder]:[&>span]:text-muted-foreground" id="file-input" type="file" name="file" accept="application/json" bind:files={files} />
				</div>

			<div class="flex items-center space-x-2 mt-2">
				<Checkbox id="cu" bind:checked={consequencesUnderstood} aria-labelledby="cu-label" />
				<Label
					id="cu-label"
					for="cu"
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					I understand that importing a backup will RESET the database to the backup
				</Label>
			</div>
			<div class="flex items-center space-x-2 mt-2">
				<Checkbox id="cu2" bind:checked={consequencesUnderstoodTwo} aria-labelledby="cu2-label" />
				<Label
					id="cu2-label"
					for="cu2"
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					I understand that any additional content not in the backup will be PERMANENTLY DESTROYED
				</Label>
			</div>
			<div class="flex items-center space-x-2 mt-2">
				<Checkbox id="iwtp" bind:checked={iWantToProceed} aria-labelledby="iwtp-label" />
				<Label
					id="iwtp-label"
					for="iwtp"
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					I understand the consequences of this action and want to proceed
				</Label>
			</div>

			<Dialog.Footer>
				<Button on:click={performImport} disabled={!allowImport}>
					<UploadIcon class="mr-2 h-4 w-4"/>
					Import
				</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</div>
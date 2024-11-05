<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Ellipsis } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog';
	import UpdateForm from './UpdateForm.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { UpdateFormSchema } from './updateFormSchema';
	import { invalidateAll } from '$app/navigation';

	export let id: number;
	export let url: string;
	export let code: string;
	export let title: string;
	export let data: SuperValidated<Infer<UpdateFormSchema>>;

	let dropOpen = false;
	let deleteDiagOpen = false;
	let updateDiagOpen = false;

	async function remove() {
		let data = new URLSearchParams();
		data.set("id", id.toString());
		await fetch("?/delete", {
			method: 'POST',
			body: data.toString(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		await invalidateAll();
		toast.success("Policy removed successfully!");
	}
	async function up() {
		let data = new URLSearchParams();
		data.set("id", id);
		await fetch("?/up", {
			method: 'POST',
			body: data.toString(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		await invalidateAll();
	}
	async function down() {
		let data = new URLSearchParams();
		data.set("id", id);
		await fetch("?/down", {
			method: 'POST',
			body: data.toString(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		await invalidateAll();
	}
</script>

<DropdownMenu.Root bind:open={dropOpen}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			variant="ghost"
			builders={[builder]}
			size="icon"
			class="relative h-8 w-8 p-0 float-right mr-2"
		>
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item
				on:click={() => {
					navigator.clipboard.writeText(id);
					toast.success('Policy ID copied to clipboard!');
				}}
			>
				Copy policy ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href={url}>View</DropdownMenu.Item>
		<DropdownMenu.Item on:click={up}>Move Up</DropdownMenu.Item>
		<DropdownMenu.Item on:click={down}>Move Down</DropdownMenu.Item>
		<DropdownMenu.Item
			on:click={() => {
				dropOpen = false;
				updateDiagOpen = true;
			}}>Update</DropdownMenu.Item
		>
		<DropdownMenu.Item
			on:click={() => {
				dropOpen = false;
				deleteDiagOpen = true;
			}}>Delete</DropdownMenu.Item
		>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<Dialog.Root bind:open={updateDiagOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Update policy</Dialog.Title>
			<Dialog.Description>
				Make sure your link is visible to the public. Preferably, a PDF document uploaded to the
				content bucket, to ensure proper global reachability.
			</Dialog.Description>
		</Dialog.Header>
		<UpdateForm
			{id}
			{url}
			{code}
			{title}
			onSubmit={async () => {
				updateDiagOpen = false;
				toast.success('Policy updated successfully!');
			}}
			{data}
		/>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={deleteDiagOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Are you sure?</Dialog.Title>
			<Dialog.Description>
				The policy will be immediately removed.
			</Dialog.Description>
		</Dialog.Header>
		<Button on:click={() => {deleteDiagOpen = false; remove()}} variant="destructive">Yes, I'm sure</Button>
		<Button on:click={() => {deleteDiagOpen = false;}} variant="secondary">Nevermind</Button>
	</Dialog.Content>
</Dialog.Root>

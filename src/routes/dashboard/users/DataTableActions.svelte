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
	import ResetForm from './ResetForm.svelte';
	import type { ResetFormSchema } from './resetFormSchema';

	export let id: number;
	export let first_name: string;
	export let last_name: string;
	export let username: string;
	export let permissionLevel: number;
	export let data: SuperValidated<Infer<UpdateFormSchema>>;
	export let data2: SuperValidated<Infer<ResetFormSchema>>;

	console.log(data2);

	let dropOpen = false;
	let deleteDiagOpen = false;
	let updateDiagOpen = false;
	let resetDiagOpen = false;

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
					navigator.clipboard.writeText(id.toString());
					toast.success('User ID copied to clipboard!');
				}}
			>
				Copy user ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item
			on:click={() => {
				dropOpen = false;
				updateDiagOpen = true;
			}}>Update</DropdownMenu.Item
		>
		<DropdownMenu.Item
			on:click={() => {
				dropOpen = false;
				resetDiagOpen = true;
			}}>Reset Password</DropdownMenu.Item
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
			<Dialog.Title>Update user</Dialog.Title>
		</Dialog.Header>
		<UpdateForm
			{id}
			{first_name}
			{last_name}
			{username}
			{permissionLevel}
			onSubmit={async () => {
				updateDiagOpen = false;
				toast.success('User updated successfully!');
			}}
			{data}
		/>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={resetDiagOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Reset user's password</Dialog.Title>
		</Dialog.Header>
		<ResetForm
			{id}
			onSubmit={async () => {
				resetDiagOpen = false;
				toast.success('User\'s password reset successfully!');
			}}
			data={data2}
		/>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={deleteDiagOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Are you sure?</Dialog.Title>
			<Dialog.Description>
				The user will be immediately removed and their access will be revoked.
			</Dialog.Description>
		</Dialog.Header>
		<Button on:click={() => {deleteDiagOpen = false; remove()}} variant="destructive">Yes, I'm sure</Button>
		<Button on:click={() => {deleteDiagOpen = false;}} variant="secondary">Nevermind</Button>
	</Dialog.Content>
</Dialog.Root>

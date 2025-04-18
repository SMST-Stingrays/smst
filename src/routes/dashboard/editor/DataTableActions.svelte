<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Ellipsis } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import { Input } from '$lib/components/ui/input';
	export let id: number;
	export let slug: string;
	export let name: string;

	let dropOpen = false;
	let diagOpen = false;

	let newName = name;
	let renameOpen = false;

	async function remove() {
		let data = new URLSearchParams();
		data.set("id", id);
		await fetch("?/delete", {
			method: 'POST',
			body: data.toString(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		await invalidateAll();
		toast.success("Page removed successfully!");
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
	async function rename() {
		let data = new URLSearchParams();
		data.set("id", id);
		data.set("name", newName);
		await fetch("?/rename", {
			method: 'POST',
			body: data.toString(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		await invalidateAll();
		toast.success("Page renamed successfully!");
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
					toast.success('Page ID copied to clipboard!');
				}}
			>
				Copy page ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href="/{slug}">View</DropdownMenu.Item>
		<DropdownMenu.Item href="/_edit/{id}">Edit</DropdownMenu.Item>
		<DropdownMenu.Item on:click={up}>Move Up</DropdownMenu.Item>
		<DropdownMenu.Item on:click={down}>Move Down</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => {dropOpen = false; renameOpen = true;}}>Rename</DropdownMenu.Item>
		<DropdownMenu.Item
			on:click={() => {
				dropOpen = false;
				diagOpen = true;
			}}>Delete</DropdownMenu.Item
		>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<Dialog.Root bind:open={diagOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Are you sure?</Dialog.Title>
			<Dialog.Description>
				The page will be immediately removed and all of it's content will be permanently lost.
				{#if !slug}
					<b>The site homepage will be broken until you add a new home page.</b>
				{:else}
					<b>All urls pointing to /{slug} will be broken.</b>
				{/if}
			</Dialog.Description>
		</Dialog.Header>
		<Button on:click={() => {diagOpen = false; remove()}} variant="destructive">Yes, I'm sure</Button>
		<Button on:click={() => {diagOpen = false;}} variant="secondary">Nevermind</Button>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={renameOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Rename</Dialog.Title>
		</Dialog.Header>
		<Input bind:value={newName} />
		<Button on:click={() => {renameOpen = false; rename()}}>Rename</Button>
		<Button on:click={() => {renameOpen = false;}} variant="secondary">Nevermind</Button>
	</Dialog.Content>
</Dialog.Root>
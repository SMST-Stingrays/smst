<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from '$lib/components/ui/button';
	import { Ellipsis } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let id;
	export let url;

	let dropOpen = false;
	let diagOpen = false;
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
			<DropdownMenu.Item on:click={() => {navigator.clipboard.writeText(id); toast.success('Policy ID copied to clipboard!')}}>
				Copy policy ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href={url}>View</DropdownMenu.Item>
		<DropdownMenu.Item>Update</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => {dropOpen = false; diagOpen = true;}}>Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
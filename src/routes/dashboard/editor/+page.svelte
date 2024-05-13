<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import type { PageData } from "./$types";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	export let data: PageData;
</script>

{#if data.pages.length === 0}
	<div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
		<div class="flex flex-col items-center gap-1 text-center">
			<h3 class="text-2xl font-bold tracking-tight">There are no pages :(</h3>
			<p class="text-sm text-muted-foreground">
				Why don't you create one?
			</p>
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants() + " mt-4"}>Create Page</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Create new page</Dialog.Title>
						<Dialog.Description>
							Make changes to your profile here. Click save when you're done.
						</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="name" class="text-right">Name</Label>
							<Input id="name" value="Pedro Duarte" class="col-span-3" />
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="username" class="text-right">Username</Label>
							<Input id="username" value="@peduarte" class="col-span-3" />
						</div>
					</div>
					<Dialog.Footer>
						<Button type="submit">Save changes</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
{/if}
<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import { Button } from '$lib/components/ui/button/index.js';
	import { LogOutIcon } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Render from '$lib/components/Render.svelte';
	import { type Component, editorComponents, type EditorComponentSpec, type SlotId } from '$lib/dynamicSlot';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Sheet from "$lib/components/ui/sheet";

	export let data: PageData;

	let tree: Component[] = [];
	if (data.page) {
		tree = JSON.parse(data.page?.data).components;
	}

	function addComponent(aComp: EditorComponentSpec) {
		console.log("adding", aComp);


		tree.push({
			componentId: aComp.id,
			props: aComp.propDefaults,
			slots: aComp.slotDefaults
		});
		console.log(tree);
		tree = tree;
	}

	let selectedSlotId: SlotId | null = null;
	$: console.log(selectedSlotId);

	function traverseTree(slotId: SlotId): Component {
		let comp = tree[slotId.rootIdx];
		for (let slot of slotId.path) {
			comp = comp.slots[slot];
		}
		return comp;
	}

	$: selectedSlot = selectedSlotId && traverseTree(selectedSlotId) || null;

	function triggerTreeRefresh() {
		tree = tree;
	}
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/dashboard" class="flex items-center gap-2 font-semibold">
					<span class="">Editing Page - {data.page?.name}</span>
				</a>
				<Button href="/dashboard/editor" variant="outline" size="icon" class="ml-auto h-8 w-8">
					<LogOutIcon class="h-4 w-4" />
					<span class="sr-only">Back to dashboard</span>
				</Button>
			</div>
			<div class="grid grid-rows-2">
				<div class="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
					<span>Click a component below to add it to the tree</span>
					{#each editorComponents as aComp}
						<Button on:click={() => {addComponent(aComp)}}>{aComp.name}</Button>
					{/each}
				</div>
			</div>
			<div class="grid grid-rows-2">
				<div class="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">

					{#if selectedSlot === null}
						<span>No slot is selected. Select a slot to edit it's properties!</span>
					{:else}
						<p>Slot contains a #{selectedSlot.componentId}.</p>
						<p class="font-bold text-sm">Properties</p>
						{#each Object.entries(selectedSlot.props) as [k, v]}
							<Label>{k}</Label>
							<Input on:input={triggerTreeRefresh} bind:value={selectedSlot.props[k]} />
						{/each}
					{/if}

				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button
						variant="outline"
						size="icon"
						class="shrink-0 md:hidden"
						builders={[builder]}
					>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href="/dashboard" class="flex items-center gap-2 text-lg font-semibold">
							<span>Editing Page - {data.page?.name}</span>
						</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
		</header>
		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			{JSON.stringify(tree)}
			<!-- Render the page in editable mode -->
			{#if data.page}
				{#each tree as component, i}
					<Render bind:selectedSlotId slotId={{rootIdx: i, path: []}} editor {component} />
				{/each}
			{/if}
		</main>
	</div>
</div>

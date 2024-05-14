<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog";
	import { ChevronDown, ChevronUp, DoorOpenIcon, PlusIcon, SaveIcon } from 'lucide-svelte';
	import type { PageData } from "./$types";
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Resizable from "$lib/components/ui/resizable";
	import { type Component, editorComponents, type EditorComponentSpec } from '$lib/dynamicSlot';
	import Render from '$lib/components/Render.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	export let data: PageData;

	let root: Component[];
	root = JSON.parse(data.page.data).components;

	let treeRootCollapsed = false;

	function addComponentToRoot(id: string, comp: EditorComponentSpec) {
		let slots = {};

		for (let [k, v] of Object.entries(comp.slots)) {
			slots[k] = v.default;
		}

		let props = {};

		for (let [k, v] of Object.entries(comp.props)) {
			props[k] = v.default;
		}

		console.log(slots, props);

		root.push({
			componentId: id,
			slots,
			props
		});

		console.log(root);

		root = root;
	}

	let selected: number | null = null;
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/dashboard" class="flex items-center gap-2 font-semibold">
					<span class="">Editing - {data.page.name}</span>
				</a>
				<div class="ml-auto flex flex-row space-x-2">
					<Button href="/dashboard/editor" label="Back to site" variant="outline" size="icon" class="h-8 w-8">
						<DoorOpenIcon class="h-4 w-4" />
						<span class="sr-only">Back to site</span>
					</Button>
					<Button variant="outline" size="icon" class="h-8 w-8">
						<SaveIcon class="h-4 w-4" />
						<span class="sr-only">Save</span>
					</Button>
				</div>
			</div>
			<Resizable.PaneGroup direction="vertical">
				<Resizable.Pane>
					<p class="text-sm text-muted-foreground font-bold mx-2 my-1">Tree</p>

					<div class="grid items-start px-2 text-sm font-medium lg:px-4">
						<div class="flex flex-row">
							<div class="flex flex-row space-x-2">
								<Button on:click={() => {treeRootCollapsed = !treeRootCollapsed;}} variant="ghost" size="icon" class="ml-auto h-6 w-6">
									{#if treeRootCollapsed}
										<ChevronUp class="h-4 w-4" />
										<span class="sr-only">Expand</span>
									{:else}
										<ChevronDown class="h-4 w-4"/>
										<span class="sr-only">Collapse</span>
									{/if}
								</Button>
								<span>Page</span>
							</div>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button on:click={() => {treeRootCollapsed = false;}} builders={[builder]} variant="ghost" size="icon" class="ml-auto h-6 w-6">
										<PlusIcon class="h-4 w-4" />
										<span class="sr-only">Back to site</span>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Label>Add Component</DropdownMenu.Label>
									<DropdownMenu.Separator />
									{#each Object.entries(editorComponents) as [id, component]}
										<DropdownMenu.Item on:click={() => {addComponentToRoot(id, component)}}>{component.name}</DropdownMenu.Item>
									{/each}
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>

						<div class="flex flex-col">
							{#if !treeRootCollapsed}
								{#each root as c, i}
									<button on:click={() => {selected = i;}} class="text-left align-top text-sm hover:bg-muted transition-colors px-3 py-1 ml-8" class:bg-muted={selected === i}>{c.componentId}</button>
								{/each}
							{/if}
						</div>
					</div>
				</Resizable.Pane>
				<Resizable.Handle withHandle />
				<Resizable.Pane>
					<div class="mx-2 my-1">
						<p class="text-sm text-muted-foreground font-bold mb-3">Properties</p>

						{#if selected !== null}
							<p class="text-sm">Selected: #{selected} {root[selected].componentId}</p>

							{#each Object.entries(root[selected].props) as [k, v]}
								<Label for={k}>{k}</Label>
								<Input id={k} bind:value={root[selected].props[k]} />
							{/each}
						{:else}
							<p class="text-sm">Nothing selected, select something in the tree above to edit it</p>
						{/if}
					</div>
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</div>
	</div>
	<div class="flex flex-col">
		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			{#each root as c}
				<Render component={c} />
			{/each}
		</main>
	</div>
</div>

<script lang="ts">
	import type { Media } from '@prisma/client';
	import { get, writable } from 'svelte/store';
	import { createRender, createTable } from 'svelte-headless-table';
	import { Subscribe } from 'svelte-headless-table';
	import { Render } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import DataTableActions from './DataTableActions.svelte';
	import DataTablePreview from './DataTablePreview.svelte';
	import { addPagination, addTableFilter, addSelectedRows } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	import { Input } from "$lib/components/ui/input";
	import DataTableCheckbox from './DataTableCheckbox.svelte';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { LoaderCircle } from 'lucide-svelte';

	export let data: Media[];

	let store = writable(data);
	$: $store = data;

	const table = createTable(store, {
		filter: addTableFilter({
			fn: ({ filterValue, value }) =>
				value.toLowerCase().includes(filterValue.toLowerCase()),
		}),
		select: addSelectedRows()
	});
	const columns = table.createColumns([
		table.column({
			accessor: "id",
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allPageRowsSelected,
				});
			},
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(DataTableCheckbox, {
					checked: isSelected,
				});
			},
			plugins: {
				filter: {
					exclude: true,
				},
			},
		}),

		table.column({
			accessor: 'title',
			header: 'File'
		}),

		table.column({
			accessor: 'type',
			header: 'Type',
			cell: ({value}) => {
				if (value === 'photo') { return "Photo (Page Editor Only)" }
				else if (value === 'galleryPhoto') { return "Photo (In Gallery)" }
				else if (value === 'policy') { return "Policy" }
				else { return "Unknown" }
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: ({ type, url }) => {return {type, url}},
			header: 'Preview',
			// @ts-expect-error it's fine shut
			cell: ({ value }) => createRender(DataTablePreview, value),
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: ({ id, url, type, title }) => {
				return { id, url, type, title };
			},
			header: '',
			cell: ({ value }) => createRender(DataTableActions, value),
			plugins: {
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, rows } =
		table.createViewModel(columns);

	const { filterValue } = pluginStates.filter;
	const { selectedDataIds } = pluginStates.select;

	let deleteLoading = false;

	$: console.log($selectedDataIds);

	async function removeSelected() {
		deleteLoading = true;

		let ids = [];

		for (const r_id of Object.keys(get(selectedDataIds))) {
			const id = data[Number(r_id)].id;
			ids.push(id);
		}


		let rdata = new URLSearchParams();
		rdata.set("id", JSON.stringify(ids));
		await fetch("?/deleteMany", {
			method: 'POST',
			body: rdata.toString(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		await invalidateAll();
		toast.success("Media removed successfully!");
		selectedDataIds.set({});
		deleteLoading = false;
	}

	let optimizeLoading = false;
	async function optimizeSelected() {
		optimizeLoading = true;

		let ids = [];

		for (const r_id of Object.keys(get(selectedDataIds))) {
			const id = data[Number(r_id)].id;
			ids.push(id);
		}


		let rdata = new URLSearchParams();
		rdata.set("id", JSON.stringify(ids));
		await fetch("?/optimizeMany", {
			method: 'POST',
			body: rdata.toString(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		await invalidateAll();
		toast.success("Media optimized successfully!");
		selectedDataIds.set({});
		optimizeLoading = false;
	}
</script>

<div class="p-0 mt-0">
	<div class="flex items-center justify-between space-x-4 my-0">
		<div class="flex items-center space-x-4">
			<div class="flex items-center py-4">
				<Input
					class="max-w-sm"
					placeholder="Filter by filename..."
					type="text"
					bind:value={$filterValue}
				/>
			</div>
			<div class="flex-1 text-sm text-muted-foreground">
				{Object.keys($selectedDataIds).length} of{" "}
				{$rows.length} selected.
			</div>
			{#if Object.keys($selectedDataIds).length}
				<Button on:click={removeSelected} variant="destructive" disabled={deleteLoading}>
					{#if deleteLoading}
						<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Delete Selected
				</Button>
			{/if}
			{#if deleteLoading}
				Mass deletes can take a very, very long time. Please be patient!
			{/if}

			{#if Object.keys($selectedDataIds).length}
				<Button on:click={optimizeSelected} variant="outline" disabled={optimizeLoading}>
					{#if optimizeLoading}
						<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Optimize Selected
				</Button>
			{/if}
			{#if deleteLoading}
				Image optimization can take a long time. Please be patient!
			{/if}
		</div>


	</div>
	<div class="rounded-lg border shadow-sm">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
									<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row
							{...rowAttrs}
							data-state={$selectedDataIds[row.id] && "selected"}
						>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
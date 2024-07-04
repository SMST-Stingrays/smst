<script lang="ts">
	import type { Media } from '@prisma/client';
	import { writable } from 'svelte/store';
	import { createRender, createTable } from 'svelte-headless-table';
	import { Subscribe } from 'svelte-headless-table';
	import { Render } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import DataTableActions from './DataTableActions.svelte';
	import DataTablePreview from './DataTablePreview.svelte';

	export let data: Media[];

	let store = writable(data);
	$: $store = data;

	const table = createTable(store);
	const columns = table.createColumns([
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
			}
		}),
		table.column({
			accessor: ({ type, url }) => {return {type, url}},
			header: 'Preview',
			// @ts-expect-error it's fine shut
			cell: ({ value }) => createRender(DataTablePreview, value)
		}),
		table.column({
			accessor: ({ id, url, type, title }) => {
				return { id, url, type, title };
			},
			header: '',
			cell: ({ value }) => createRender(DataTableActions, value)
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div class="rounded-lg border shadow-sm">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
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
					<Table.Row {...rowAttrs}>
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

<script lang="ts">
	import type { Sponsor } from '@prisma/client';
	import { writable } from 'svelte/store';
	import { createRender, createTable } from 'svelte-headless-table';
	import { Subscribe } from 'svelte-headless-table';
	import { Render } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import DataTableActions from './DataTableActions.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { UpdateFormSchema } from './updateFormSchema';
	import DataTablePreview from './DataTablePreview.svelte';

	export let data: Sponsor[];
	export let fData: SuperValidated<Infer<UpdateFormSchema>>;

	let store = writable(data);
	$: $store = data;

	const table = createTable(store);
	const columns = table.createColumns([
		table.column({
			accessor: 'name',
			header: 'Name'
		}),
		table.column({
			accessor: 'logoUrl',
			header: 'Logo URL',
			cell: ({value}) => createRender(DataTablePreview, {url: value})
		}),
		table.column({
			accessor: 'sponsorLink',
			header: 'Sponsor URL',
		}),
		table.column({
			accessor: 'listPrio',
			header: 'Order (lowest first)',
		}),
		table.column({
			accessor: ({ id, name, logoUrl, sponsorLink }) => {
				return { id, logoUrl, sponsorLink, name, data: fData };
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

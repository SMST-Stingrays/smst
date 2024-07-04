<script lang="ts">
	import type { Policy, User } from '@prisma/client';
	import { writable } from 'svelte/store';
	import { createRender, createTable } from 'svelte-headless-table';
	import { Subscribe } from 'svelte-headless-table';
	import { Render } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import DataTableActions from './DataTableActions.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { UpdateFormSchema } from './updateFormSchema';
	import { ADMIN, EDITOR, VISITOR } from '$lib/permissions';
	import type { ResetFormSchema } from './resetFormSchema';

	export let data: User[];
	export let fData: SuperValidated<Infer<UpdateFormSchema>>;
	export let fData2: SuperValidated<Infer<ResetFormSchema>>;

	console.log(fData2);

	let store = writable(data);
	$: $store = data;

	const table = createTable(store);
	const columns = table.createColumns([
		table.column({
			accessor: 'username',
			header: 'Username'
		}),
		table.column({
			accessor: 'first_name',
			header: 'First Name'
		}),
		table.column({
			accessor: 'last_name',
			header: 'Last Name'
		}),
		table.column({
			accessor: 'permissionLevel',
			header: 'Permissions',
			cell: ({value}) => {
				if (value === VISITOR) {
					return "Visitor";
				} else if (value === EDITOR) {
					return "Editor";
				} else if (value === ADMIN) {
					return "Admin";
				} else {
					return "Unknown";
				}
			}
		}),
		table.column({
			accessor: ({ id, first_name, last_name, username, permissionLevel }) => {
				return { id, first_name, last_name, username, permissionLevel, data: fData, data2: fData2 };
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

<script lang="ts">
	import SuperDebug, { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { updateFormSchema, type UpdateFormSchema } from './updateFormSchema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Form from '$lib/components/ui/form';
	import * as Select from "$lib/components/ui/select";
	import { Loader2Icon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { ADMIN, EDITOR, VISITOR } from '$lib/permissions';

	export let data: SuperValidated<Infer<UpdateFormSchema>>;
	export let onSubmit: () => void;
	export let id: number;
	export let first_name: string;
	export let last_name: string;
	export let username: string;
	export let permissionLevel: number;
	const form = superForm(data, {
		validators: zodClient(updateFormSchema),
		onUpdated({ form }) {
			if (form.valid) {
				onSubmit();
			}
		}
	});

	const { form: formData, enhance, delayed } = form;

	$: $formData.first_name = first_name;
	$: $formData.last_name = last_name;
	$: $formData.username = username;
	$: $formData.permissionLevel = permissionLevel;
	$: $formData.id = id;

	let labels: Map<number, string> = new Map();
	labels.set(VISITOR, "Visitor");
	labels.set(EDITOR, "Editor");
	labels.set(ADMIN, "Admin");
	$: selectedPermissions = $formData.permissionLevel
		? {
			label: labels.get($formData.permissionLevel),
			value: $formData.permissionLevel
		}
		: undefined;

	$: console.log($formData.permissionLevel);
</script>

<form method="POST" use:enhance action="?/update">
	<div class="grid gap-4">
		<input type="hidden" name="id" bind:value={id} />
		<Form.Field {form} name="username">
			<Form.Control let:attrs>
				<Form.Label>Username</Form.Label>
				<Input placeholder="john.doe" {...attrs} bind:value={$formData.username} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="first_name">
			<Form.Control let:attrs>
				<Form.Label>First Name</Form.Label>
				<Input placeholder="John" {...attrs} bind:value={$formData.first_name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="last_name">
			<Form.Control let:attrs>
				<Form.Label>Last Name</Form.Label>
				<Input
					placeholder="Doe"
					{...attrs}
					bind:value={$formData.last_name}
				/>
			</Form.Control>
		</Form.Field>

		<Form.Field {form} name="permissionLevel">
			<Form.Control let:attrs>
				<Form.Label>Permission Level</Form.Label>
				<Select.Root selected={selectedPermissions} onSelectedChange={(v) => {v && ($formData.permissionLevel = v.value)}}>
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Select a permission level" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value={VISITOR} label="Visitor" />
						<Select.Item value={EDITOR} label="Editor" />
						<Select.Item value={ADMIN} label="Admin" />
					</Select.Content>
				</Select.Root>
				<input type="hidden" name="permissionLevel" bind:value={$formData.permissionLevel} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button class="w-full">
			{#if $delayed}
				<Loader2Icon class="w-4 h-4 animate-spin" />
			{:else}
				Update User
			{/if}
		</Form.Button>
	</div>
</form>

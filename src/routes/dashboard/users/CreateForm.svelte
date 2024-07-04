<script lang="ts">
	import SuperDebug, { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { formSchema, type FormSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Form from '$lib/components/ui/form';
	import * as Select from "$lib/components/ui/select";
	import { Loader2Icon } from 'lucide-svelte';
	import { ADMIN, EDITOR, VISITOR } from '$lib/permissions';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let onSubmit: () => void;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onUpdated({ form }) {
			if (form.valid) {
				onSubmit();
			}
		}
	});

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

	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" use:enhance action="?/create">
	<div class="grid gap-4">
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
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.password} />
			</Form.Control>
			<Form.FieldErrors />
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
				Add User
			{/if}
		</Form.Button>
	</div>
</form>

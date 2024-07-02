<script lang="ts">
	import SuperDebug, { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { formSchema, type FormSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Form from '$lib/components/ui/form';
	import { Loader2Icon } from 'lucide-svelte';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" use:enhance>
	<div class="grid gap-4">
		<div class="grid grid-cols-2 gap-4">
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
					<Input placeholder="Doe" {...attrs} bind:value={$formData.last_name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<Form.Field {form} name="username">
			<Form.Control let:attrs>
				<Form.Label>Username</Form.Label>
				<Input placeholder="john.doe" {...attrs} bind:value={$formData.username} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input {...attrs} type="password" bind:value={$formData.password} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password_confirm">
			<Form.Control let:attrs>
				<Form.Label>Confirm Password</Form.Label>
				<Input {...attrs} type="password" bind:value={$formData.password_confirm} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button class="w-full">
			{#if $delayed}
				<Loader2Icon class="w-4 h-4 animate-spin" />
			{:else}
				Create Account
			{/if}
		</Form.Button>
	</div>
</form>

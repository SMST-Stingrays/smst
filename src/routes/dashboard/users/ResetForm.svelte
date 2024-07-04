<script lang="ts">
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { resetFormSchema, type ResetFormSchema } from './resetFormSchema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import * as Select from "$lib/components/ui/select";
	import { Loader2Icon } from 'lucide-svelte';

	export let data: SuperValidated<Infer<ResetFormSchema>>;
	export let onSubmit: () => void;
	export let id: number;

	const form = superForm(data, {
		validators: zodClient(resetFormSchema),
		onUpdated({ form }) {
			if (form.valid) {
				onSubmit();
			}
		}
	});

	const { form: formData, enhance, delayed } = form;

	$: $formData.id = id;

</script>

<form method="POST" use:enhance action="?/reset">
	<div class="grid gap-4">
		<input type="hidden" name="id" bind:value={id} />
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>New Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.password} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button class="w-full">
			{#if $delayed}
				<Loader2Icon class="w-4 h-4 animate-spin" />
			{:else}
				Reset Password
			{/if}
		</Form.Button>
	</div>
</form>

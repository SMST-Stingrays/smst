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
	export let onSubmit: () => void;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onUpdated({ form }) {
			if (form.valid) {
				onSubmit();
			}
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<form method="POST" use:enhance>
	<div class="grid gap-4">
		<Form.Field {form} name="name">
			<Form.Control let:attrs>
				<Form.Label>Page Name</Form.Label>
				<Input placeholder="About Us" {...attrs} bind:value={$formData.name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="slug">
			<Form.Control let:attrs>
				<Form.Label>Slug</Form.Label>
				<Input {...attrs} bind:value={$formData.slug} />
			</Form.Control>
			<Form.Description>
				A unique identifier used as the link to this page. <b>Leave blank</b> to set as the homepage.
				{#if $formData.name}
					Use <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mr-0.5">
						{$formData.name.toLowerCase().replace(' ', '_')}
					</code> if you don't know what to pick.
				{/if}
			</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button class="w-full">
			{#if $delayed}
				<Loader2Icon class="w-4 h-4 animate-spin" />
			{:else}
				Create Page
			{/if}
		</Form.Button>
	</div>
</form>


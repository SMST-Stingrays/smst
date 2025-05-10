<script lang="ts">
	import SuperDebug, { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { updateFormSchema, type UpdateFormSchema } from './updateFormSchema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Form from '$lib/components/ui/form';
	import { Loader2Icon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<UpdateFormSchema>>;
	export let onSubmit: () => void;
	export let id: number;
	export let name: string;
	export let logoUrl: string;
	export let sponsorLink: string;


	const form = superForm(data, {
		validators: zodClient(updateFormSchema),
		onUpdated({ form }) {
			if (form.valid) {
				onSubmit();
			}
		}
	});

	const { form: formData, enhance, delayed } = form;

	$: $formData.id = id;
	$: $formData.name = name;
	$: $formData.logoUrl = logoUrl;
	$: $formData.sponsorLink = sponsorLink;
</script>

<form method="POST" use:enhance action="?/update">
	<div class="grid gap-4">
		<input type="hidden" name="id" bind:value={id} />
		<Form.Field {form} name="name">
			<Form.Control let:attrs>
				<Form.Label>Name</Form.Label>
				<Input placeholder={name} {...attrs} bind:value={$formData.name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="logoUrl">
			<Form.Control let:attrs>
				<Form.Label>Logo URL</Form.Label>
				<Input placeholder={logoUrl} {...attrs} bind:value={$formData.logoUrl} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="sponsorLink">
			<Form.Control let:attrs>
				<Form.Label>Sponsor Link</Form.Label>
				<Input
					placeholder={sponsorLink}
					{...attrs}
					bind:value={$formData.sponsorLink}
				/>
			</Form.Control>
		</Form.Field>

		<Form.Button class="w-full">
			{#if $delayed}
				<Loader2Icon class="w-4 h-4 animate-spin" />
			{:else}
				Update Sponsor
			{/if}
		</Form.Button>
	</div>
</form>

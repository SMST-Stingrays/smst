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
	export let code: string;
	export let title: string;
	export let url: string;

	const form = superForm(data, {
		validators: zodClient(updateFormSchema),
		onUpdated({ form }) {
			if (form.valid) {
				onSubmit();
			}
		}
	});

	const { form: formData, enhance, delayed } = form;

	$: $formData.code = code;
	$: $formData.title = title;
	$: $formData.url = url;
	$: $formData.id = id;
</script>

<form method="POST" use:enhance action="?/update">
	<div class="grid gap-4">
		<input type="hidden" name="id" bind:value={id} />
		<Form.Field {form} name="code">
			<Form.Control let:attrs>
				<Form.Label>Policy Code</Form.Label>
				<Input placeholder="SMST_POL_COI_01" {...attrs} bind:value={$formData.code} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="title">
			<Form.Control let:attrs>
				<Form.Label>Title</Form.Label>
				<Input placeholder="Conflict of Interest Policy" {...attrs} bind:value={$formData.title} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="url">
			<Form.Control let:attrs>
				<Form.Label>URL</Form.Label>
				<Input
					placeholder="https://content.gosmst.com/policy/smst_pol_coi_01.pdf"
					{...attrs}
					bind:value={$formData.url}
				/>
			</Form.Control>
			<Form.Description>
				The <u><b>PUBLIC</b></u> URL to access this policy. Preferably, upload it to the content bucket,
				and use the generated URL.
			</Form.Description>
		</Form.Field>

		<Form.Button class="w-full">
			{#if $delayed}
				<Loader2Icon class="w-4 h-4 animate-spin" />
			{:else}
				Update Policy
			{/if}
		</Form.Button>
	</div>
</form>

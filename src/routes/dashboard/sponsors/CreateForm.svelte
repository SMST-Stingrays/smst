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

<form method="POST" use:enhance action="?/create">
	<div class="grid gap-4">
		<Form.Field {form} name="name">
			<Form.Control let:attrs>
				<Form.Label>Sponsor Name</Form.Label>
				<Input placeholder="BigMoney Inc" {...attrs} bind:value={$formData.name} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="logoUrl">
			<Form.Control let:attrs>
				<Form.Label>Logo URL</Form.Label>
				<Input placeholder="https://content.gosmst.com/photo/bigMoneyInc.png" {...attrs} bind:value={$formData.logoUrl} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="sponsorUrl">
			<Form.Control let:attrs>
				<Form.Label>Sponsor Site URL</Form.Label>
				<Input
					placeholder="https://bigmoney.com"
					{...attrs}
					bind:value={$formData.sponsorUrl}
				/>
			</Form.Control>
		</Form.Field>

		<Form.Button class="w-full">
			{#if $delayed}
				<Loader2Icon class="w-4 h-4 animate-spin" />
			{:else}
				Add Sponsor
			{/if}
		</Form.Button>
	</div>
</form>

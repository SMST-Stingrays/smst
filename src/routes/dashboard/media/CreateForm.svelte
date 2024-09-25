<script lang="ts">
	import SuperDebug, { filesProxy, type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { formSchema, type FormSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Form from '$lib/components/ui/form';
	import * as Alert from '$lib/components/ui/alert';
	import * as Select from '$lib/components/ui/select';
	import { Loader2Icon } from 'lucide-svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let onSubmit: () => void;

	let progress = 0;

	function fileUploadWithProgress(input: Parameters<SubmitFunction>[0]) {
		return new Promise<XMLHttpRequest>((resolve) => {
			const xhr = new XMLHttpRequest();

			xhr.upload.onprogress = function(event) {
				progress = Math.round((100 * event.loaded) / event.total);
			};

			xhr.onload = function() {
				if (xhr.readyState === xhr.DONE) {
					progress = 0;
					resolve(xhr);
				}
			};

			xhr.open('POST', input.action, true);
			xhr.send(input.formData);
		});
	}


	const form = superForm(data, {
		validators: zodClient(formSchema),
		onSubmit({ customRequest }) {
			customRequest(fileUploadWithProgress)
		},
		onUpdated({ form }) {
			if (form.valid) {
				onSubmit();
			}
		}
	});

	const { form: formData, enhance, delayed } = form;

	let labels = {
		'photo': 'Photo (For Site)',
		'galleryPhoto': 'Photo (In Gallery)',
		'policy': 'Policy (PDF)'
	};
	$: selectedType = $formData.type
		? {
			label: labels[$formData.type],
			value: $formData.type
		}
		: undefined;

	let fTypes = {
		'photo': 'image/png, image/jpeg, image/webp, image/gif',
		'galleryPhoto': 'image/png, image/jpeg, image/webp, image/gif',
		'policy': 'application/pdf'
	};
	$: acceptableFileTypes = fTypes[$formData.type];

	const file = filesProxy(form, 'file');
</script>

<form enctype="multipart/form-data" method="POST" use:enhance action="?/create">
	<div class="grid gap-4">
		<Form.Field {form} name="type">
			<Form.Control let:attrs>
				<Form.Label>Media Type</Form.Label>
				<Select.Root selected={selectedType} onSelectedChange={(v) => {v && ($formData.type = v.value)}}>
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Select a media type" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="policy" label="Policy (PDF)" />
						<Select.Item value="photo" label="Photo (For Site)" />
						<Select.Item value="galleryPhoto" label="Photo (In Gallery)" />
					</Select.Content>
				</Select.Root>
				<input type="hidden" name="type" bind:value={$formData.type} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		{#if $formData.type === 'photo'}
			<Alert.Root class="bg-zinc-900">
				<Alert.Title>Heads up!</Alert.Title>
				<Alert.Description>A <b>Photo (For Site)</b> will <u>not</u> appear in the photo gallery on the site. Use a <b>Photo
					(In Gallery)</b> if you want it to appear in the gallery (you can still use it in the editor)
				</Alert.Description>
			</Alert.Root>
		{/if}

		<Form.Field {form} name="file">
			<Form.Control let:attrs>
				<!--<div class="space-y-2">-->
				<!--<label for="file-input" class="text-sm font-medium leading-none">File Upload</label>-->
				<!--				</div>-->
				<Form.Label>File Upload</Form.Label>
				<!--  -->
				<input {...attrs} multiple type="file" name="file" accept={acceptableFileTypes} bind:files={$file}
							 class="pt-1.5 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-destructive [&>span]:line-clamp-1 data-[placeholder]:[&>span]:text-muted-foreground" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<p>Your files must, in total, be less than 100 MB.</p>

		{#if progress !== 100}
			<Alert.Root class="bg-zinc-900">
				<Alert.Title>Please be patient!</Alert.Title>
				<Alert.Description>Media can take a long time to upload and process, especially if you're uploading multiple
					files. Please be patient and <b>DO NOT CLOSE THE TAB OR THE POPUP</b> until uploads are complete. This popup
					will close when finished.
				</Alert.Description>
			</Alert.Root>
		{/if}

		<Form.Button class="w-full">
			{#if $delayed}
				{#if progress !== 100}
					{progress/2}%
					<Loader2Icon class="w-4 h-4 animate-spin" />
				{:else}
					Processing <Loader2Icon class="w-4 h-4 animate-spin" />
				{/if}
			{:else}
				Upload Media
			{/if}
		</Form.Button>
		{#if progress === 100}
			<p>Upload complete. Media is now processing. Media will be made available once processing is complete. You may now close this tab, or wait for processing to finish.</p>
		{/if}
	</div>
</form>

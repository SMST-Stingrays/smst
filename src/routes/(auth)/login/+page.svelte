<script lang="ts">
	import type { PageData } from './$types';
	import LoginForm from './LoginForm.svelte';

	export let data: PageData;
</script>

<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
	<div class="hidden bg-muted lg:block">
		<img
			src="/images/placeholder.svg"
			alt="placeholder"
			width="1920"
			height="1080"
			class="h-screen w-screen object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Login</h1>
				<p class="text-balance text-muted-foreground">
					Log into your account with the SMST Stingrays.
				</p>
			</div>
			<LoginForm data={data.form} />
			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="/register" class="underline"> Register </a>
			</div>
			<div class="text-center text-sm">
				<a href="/" class="underline underline-offset-4 font-semibold">&larr; Go back home</a>
			</div>
		</div>
	</div>
</div>

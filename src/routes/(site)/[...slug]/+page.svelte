<script lang="ts">
	import type { PageData } from './$types';
	import Render from '$lib/components/Render.svelte';

	export let data: PageData;
</script>

<div class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
	{#if data.page}
		{#key data.page.root.components}
			{#each data.page.root.components as component}
				<Render {component} />
			{/each}
		{/key}
	{:else}
		<h1 class="font-bold text-3xl">Page not found</h1>
		<p class="leading-7">
			The page you requested could not be found. It may have been removed or it may have never
			existed in the first place. <br /><a
				class="underline underline-offset-4 font-medium text-primary"
				href="/">&larr; Go back home</a
			>
		</p>
	{/if}
</div>

<script lang="ts">
	import { Image } from '@unpic/svelte';

	export let type: "policy" | "photo" | "galleryPhoto";
	export let url: string;

	let width: number;
	let height: number;
	if (type === "photo" || type === "galleryPhoto") {
		const u: URL = new URL(url);
		width = Number.parseInt(u.searchParams.get("w")!);
		height = Number.parseInt(u.searchParams.get("h")!);
	}
</script>

{#if type === "policy"}
	<a class="underline underline-offset-4" href={url} target="_blank">Preview in New Tab</a>
{:else if type === "photo" || type === "galleryPhoto"}
	<div class="max-w-sm">
		<Image {width} {height} class="rounded-lg overflow-hidden" src={url} alt="Preview of {url}" />
	</div>
	{#if type === "galleryPhoto"}
		<p class="text-muted-foreground">(visible in gallery)</p>
	{/if}
{/if}
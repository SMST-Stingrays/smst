<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { MenuIcon } from 'lucide-svelte';
	import MobileLink from '$lib/components/nav/MobileLink.svelte';
	import { siteConfig } from '$lib/siteConfig';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { page } from "$app/stores";
	import { cn } from '$lib/utils';

	let open = false;
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden flex">
			<MenuIcon class="h-5 w-5" />
			<span class="sr-only">Toggle Menu</span>
			<span class="md:hidden font-bold sm:inline-block text-p ml-2">
				{siteConfig.name}
			</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="pr-0">
		<MobileLink href="/" class="flex items-center" bind:open>
			<p class="font-bold block">{siteConfig.name}</p>
		</MobileLink>
		<ScrollArea orientation="both" class="my-4 h-[calc(100vh-8rem)] pb-10">
			<div class="flex flex-col space-y-3">
				{#each $page.data.pages as p}
					<MobileLink href="/{p.slug}" bind:open class="text-foreground">{p.name}</MobileLink>
				{/each}
				<MobileLink href="/policies" bind:open class="text-foreground">Policies</MobileLink>
				{#if $page.data.user}
					<MobileLink href="/dashboard" bind:open class="text-foreground">Dashboard</MobileLink>
					<MobileLink href="/logout" bind:open class="text-foreground">Log out</MobileLink>
				{:else}
					<MobileLink href="/login" bind:open class="text-foreground">Log in</MobileLink>
				{/if}
			</div>
		</ScrollArea>
	</Sheet.Content>
</Sheet.Root>
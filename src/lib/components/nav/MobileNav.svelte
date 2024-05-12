<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { MenuIcon } from 'lucide-svelte';
	import MobileLink from '$lib/components/nav/MobileLink.svelte';
	import { siteConfig } from '$lib/siteConfig';

	let open = false;
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
			<MenuIcon class="h-5 w-5" />
			<span class="sr-only">Toggle Menu</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="pr-0">
		<MobileLink href="/" class="flex items-center" bind:open>
			<span class="font-bold">{siteConfig.name}</span>
		</MobileLink>
	</Sheet.Content>
</Sheet.Root>
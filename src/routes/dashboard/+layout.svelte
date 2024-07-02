<script lang="ts">
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import Package from 'lucide-svelte/icons/package';
	import Home from 'lucide-svelte/icons/home';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Bell from 'lucide-svelte/icons/bell';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';
	import Users from 'lucide-svelte/icons/users';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { siteConfig } from '$lib/siteConfig';
	import { EditIcon, GlobeIcon, HomeIcon, LogOutIcon, GavelIcon } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { EDITOR, VISITOR, ADMIN } from '$lib/permissions';

	let dashboardPages: { icon: any; name: string; href: string; visible: boolean }[] = [
		{
			icon: HomeIcon,
			name: 'Dashboard',
			href: '/dashboard',
			visible: $page.data.user?.permissionLevel >= VISITOR
		},
		{
			icon: EditIcon,
			name: 'Page Editor',
			href: '/dashboard/editor',
			visible: $page.data.user?.permissionLevel >= EDITOR
		},
		{
			icon: GavelIcon,
			name: 'Policies',
			href: '/dashboard/policies',
			visible: $page.data.user?.permissionLevel >= ADMIN
		}
	];
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/dashboard" class="flex items-center gap-2 font-semibold">
					<span class="">{siteConfig.name}</span>
				</a>
				<Button href="/" label="Back to site" variant="outline" size="icon" class="ml-auto h-8 w-8">
					<GlobeIcon class="h-4 w-4" />
					<span class="sr-only">Back to site</span>
				</Button>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					{#each dashboardPages as p}
						{#if p.visible}
							<a
								href={p.href}
								class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								class:bg-muted={p.href === $page.url.pathname}
								class:text-primary={p.href === $page.url.pathname}
							>
								<svelte:component this={p.icon} class="h-4 w-4" />
								{p.name}
							</a>
						{/if}
					{/each}
				</nav>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href="/dashboard" class="flex items-center gap-2 text-lg font-semibold">
							<span>{siteConfig.name}</span>
						</a>
						{#each dashboardPages as p}
							{#if p.visible}
								<a
									href={p.href}
									class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
									class:bg-muted={p.href === $page.url.pathname}
									class:text-muted-foreground={p.href !== $page.url.pathname}
									class:text-foreground={p.href === $page.url.pathname}
								>
									<svelte:component this={p.icon} class="h-4 w-4" />
									{p.name}
								</a>
							{/if}
						{/each}
					</nav>
				</Sheet.Content>
			</Sheet.Root>
			<div class="w-full flex-1"></div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
						<CircleUser class="h-5 w-5" />
						<span class="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>Hi, {$page.data.user?.first_name}</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item href="/">Return to main site</DropdownMenu.Item>
					<DropdownMenu.Item href="/logout">Logout</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>
		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<slot></slot>
		</main>
	</div>
</div>

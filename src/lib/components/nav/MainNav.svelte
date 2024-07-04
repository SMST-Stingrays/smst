<script lang="ts">
	import { siteConfig } from '$lib/siteConfig';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { logout } from "$lib/authPublic";

</script>

<div class="mr-4 hidden md:flex">
	<a href="/" class="mr-6 flex items-center space-x-2">
		<span class="hidden font-bold sm:inline-block text-p">
			{siteConfig.name}
		</span>
	</a>

	<nav class="flex items-center gap-6 text-sm">
		{#if $page.data.pages}
			{#each $page.data.pages as p}
			<a
				class={cn(
					'transition-colors hover:text-foreground/80',
					$page.url.pathname === `/${p.slug}` ? 'text-foreground' : 'text-foreground/60'
				)}
				href="/{p.slug}">{p.name}</a
			>
			{/each}
		{/if}
		<a
			class={cn(
				'transition-colors hover:text-foreground/80',
				$page.url.pathname === `/policies` ? 'text-foreground' : 'text-foreground/60'
			)}
			href="/policies">Policies</a
		>
	</nav>
</div>

<div class="hidden md:flex md:flex-1 md:items-center md:space-x-2 md:justify-end">
	<nav class="flex items-center gap-6 text-sm">
		{#if $page.data.user}
			<a class="transition-colors hover:text-foreground/80 text-foreground/60" href="/dashboard"
				>Dashboard</a
			>
			<a class="transition-colors hover:text-foreground/80 text-foreground/60" on:click={logout} href="#"
				>Log out</a
			>
			<span class="transition-colors text-foreground/80">Hi, {$page.data.user.first_name}!</span>
		{:else}
			<a class="transition-colors hover:text-foreground/80 text-foreground/60" href="/auth/login"
				>Login</a
			>
		{/if}
	</nav>
</div>

<script>
	import MainNav from '$lib/components/nav/MainNav.svelte';
	import MobileNav from '$lib/components/nav/MobileNav.svelte';
	import { page } from '$app/stores';
</script>

<header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<MainNav />
		<MobileNav />
	</div>
</header>
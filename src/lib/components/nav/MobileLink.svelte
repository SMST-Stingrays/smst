<script lang="ts">
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';


	export let href: string;
	export let open: boolean;
	export let onclick: () => void = () => {};

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a
	{href}
	class={cn(
		$page.url.pathname === href
			? 'text-foreground'
			: 'hover:text-foreground transition-colors text-foreground/60',
		className
	)}
	on:click={() => {open = false; onclick();}}
	{...$$restProps}
>
	<slot />
</a>

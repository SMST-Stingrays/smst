<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string = "";
	export { className as class };

	export let cNameTop: string = "";
	export let cNameBottom: string = "";
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 1200 120"
	preserveAspectRatio="none"
	class={cn("h-16 w-[calc(100%+1.3px)] opacity-50", className, cNameBottom)}
>
	<path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" fill="currentColor"></path>
</svg>
<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 1200 120"
	preserveAspectRatio="none"
	class={cn("h-16 w-[calc(100%+1.3px)] [transform:rotateY(180deg)]", className, cNameTop)}
>
	<path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" fill="currentColor"></path>
</svg>
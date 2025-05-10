<script lang="ts">
	import { page } from '$app/stores';
	import { Image } from '@unpic/svelte';
</script>

<section class="text-white pt-8 pb-4">
	<h2 class="text-center text-2xl mb-2 font-bold leading-8 ">Our Sponsors</h2>
	<p class="text-center text-lg font-extralight leading-8 ">We thank them all for their continued support!</p>

<div class="logos group relative overflow-hidden whitespace-nowrap  py-10 [mask-image:_linear-gradient(to_right,_transparent_0,_white_128px,white_calc(100%-128px),_transparent_100%)]">
	{#each {length: 4} as _}
		<div class="animate-slide-left-infinite group-hover:animation-pause inline-block w-max">
			{#each $page.data.sponsors as sponsor}
				<img alt={sponsor.name} class="mx-4 inline h-16" src={sponsor.logoUrl} />
			{/each}
		</div>
	{/each}
</div>
</section>

<style>
		@keyframes left_forever {
				0% {
						transform: translateX(0);
				}
				100% {
            transform: translateX(-100%);
        }
		}
	.animate-slide-left-infinite {
			animation: left_forever 60s linear infinite;
	}
</style>
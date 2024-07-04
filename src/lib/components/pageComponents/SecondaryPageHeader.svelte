<script lang="ts">
	import Divider from '$lib/components/Divider.svelte';

	export let title: string;
</script>

<div>
	<div class="text-center pt-7 bg-blue-900">
		<h1 class="text-2xl z-50 font-bold m-auto">{title}</h1>
	</div>
	<div class="text-blue-900 relative h-20">
		<div class="absolute top-0 h-16 w-full overflow-hidden leading-0">
			<Divider class="absolute bottom-0" />
		</div>
	</div>
</div>
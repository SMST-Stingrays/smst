<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let text: string;
	export let url: string;
</script>

<Button class="w-full md:w-1/2 m-auto" href={url}>{text}</Button>

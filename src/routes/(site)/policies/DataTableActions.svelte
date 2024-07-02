<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Ellipsis } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	export let id;
	export let url;
</script>

<div class="float-right flex-row justify-between gap-4">
	<Button class="mr-2" target="_blank" href={url}>View</Button>
	<Button variant="outline">Copy URL</Button>
</div>

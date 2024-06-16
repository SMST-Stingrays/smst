<script lang="ts">
	import type {PageData} from "./$types";
	import { Image } from '@unpic/svelte';
	import Divider from '$lib/components/Divider.svelte';
	import DataTable from './DataTable.svelte';

	export let data: PageData;
</script>

<div class="text-center pt-7 bg-blue-900">
	<h1 class="text-2xl z-50 font-bold m-auto">Policies</h1>
</div>
<div class="text-blue-900 relative h-20">
	<div class="absolute top-0 h-16 w-full overflow-hidden leading-0">
		<Divider class="absolute bottom-0" />
	</div>
</div>
<div class="container">
	<DataTable data={data.policies} />
</div>
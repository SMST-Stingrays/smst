<script lang="ts">
	import type { Context } from '$lib/dynamicSlot';
	import Slot from '$lib/components/Slot.svelte';

	export let ctx: Context;
</script>

<div class="grid grid-cols-2">
	<div>
		<Slot {ctx} name="col1"></Slot>
	</div>
	<div>
		<Slot {ctx} name="col2"></Slot>
	</div>
</div>
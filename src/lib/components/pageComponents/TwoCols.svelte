<script lang="ts">
	import type { Component } from '$lib/dynamicSlot';
	import Slot from '$lib/components/Slot.svelte';

	export let slots: Map<string, Component>;
</script>

<div class="grid grid-cols-2">
	<div>
		<Slot {slots} name="col1"></Slot>
	</div>
	<div>
		<Slot {slots} name="col2"></Slot>
	</div>
</div>

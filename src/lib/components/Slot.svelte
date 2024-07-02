<script lang="ts">
	import { type Component, EMPTY } from '$lib/dynamicSlot';
	import Render from '$lib/components/Render.svelte';

	export let slots: { [k: string]: Component };
	export let name: string;

	$: component = slots[name] || EMPTY;
</script>

<Render {component} />

<script lang="ts">
	import { type Component, EMPTY } from '$lib/dynamicSlot';
	import Render from '$lib/components/Render.svelte';

	export let slots: Map<string, Component>;
	export let name: string;

	$: component = slots.get(name) || EMPTY;
</script>

<Render {component} />
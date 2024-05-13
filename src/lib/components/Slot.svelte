<script lang="ts">
	import { type Context, EMPTY, slotIdAppend } from '$lib/dynamicSlot';
	import Render from '$lib/components/Render.svelte';

	export let ctx: Context;
	export let name: string;

	$: component = ctx.slots[name] || EMPTY;
</script>

<Render slotId={slotIdAppend(name, ctx.slotId)} editor={ctx.editor} {component} />
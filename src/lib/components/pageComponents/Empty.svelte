<script lang="ts">
	import type { Context } from '$lib/dynamicSlot';

	export let ctx: Context;
</script>

{#if ctx.editor}
	<p>(empty)</p>
{/if}
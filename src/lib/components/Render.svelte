<script lang="ts">
	import {
		type Component,
		type Context,
		DEFAULT_SLOT,
		EMPTY,
		SELF_CLOSING_TAGS,
		type SlotId,
		slotIdAppend
	} from '$lib/dynamicSlot';
	import H1 from "./pageComponents/H1.svelte";
	import Empty from '$lib/components/pageComponents/Empty.svelte';
	import HTML from '$lib/components/pageComponents/HTML.svelte';
	import TwoCols from '$lib/components/pageComponents/TwoCols.svelte';

	export let component: Component;
	export let idx = 0;
	export let slotId: SlotId;

	// Register new components here AND in dynamicSlot.ts
	// eslint-disable-next-line
	const availComponents: Map<string, any> = new Map([
		["H1", H1],
		["HTML", HTML],
		["TwoCols", TwoCols],
		[EMPTY.componentId, Empty]
	]);

	let activeComponent = availComponents.get(component.componentId);

	export let editor = false;
	export let selectedSlotId: SlotId | null = null;

	function select() {
		if (editor) {
			selectedSlotId = slotId;
		}
	}
</script>

<div role="button" tabindex={1} on:keydown|preventDefault={(e) => {if (e.which === 13) {select()}}} on:click|preventDefault={select} class={(editor ? "hover:bg-primary/20 hover:cursor-pointer" : "") + (selectedSlotId === slotId ? " bg-primary/20 hover:cursor-pointer" : "")}>
	{#if activeComponent}
		<svelte:component tabindex={idx+1} {editor} this={activeComponent} {...component.props} ctx={{ slots: component.slots, editor, slotId }} />
	{:else}
		{#if SELF_CLOSING_TAGS.includes(component.componentId)}
			<svelte:element tabindex={idx+1} this={component.componentId} {...component.props}/>
		{:else}
			<svelte:element tabindex={idx+1} this={component.componentId} {...component.props}>
				{#each Object.entries(component.slots) as [k, v]}
					{#if k === DEFAULT_SLOT}
						<svelte:self slotId={slotIdAppend(DEFAULT_SLOT, slotId)} idx={idx+1} bind:selectedSlotId component={v} {editor}></svelte:self>
					{:else}
						<!-- We are falling back to a HTML element, so we need to ignore named slots -->
					{/if}
				{/each}
			</svelte:element>
		{/if}
	{/if}
</div>
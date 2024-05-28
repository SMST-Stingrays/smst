<script lang="ts">
	import { type Component, DEFAULT_SLOT, EMPTY, SELF_CLOSING_TAGS } from '$lib/dynamicSlot';
	import H1 from "./pageComponents/H1.svelte";
	import Empty from '$lib/components/pageComponents/Empty.svelte';
	import HTML from '$lib/components/pageComponents/HTML.svelte';
	import TwoCols from '$lib/components/pageComponents/TwoCols.svelte';
	import H2 from '$lib/components/pageComponents/H2.svelte';
	import H3 from '$lib/components/pageComponents/H3.svelte';

	export let component: Component;

	// Register new components here
	// eslint-disable-next-line
	const availComponents: Map<string, any> = new Map([
		["H1", H1],
		["H2", H2],
		["H3", H3],
		["HTML", HTML],
		["TwoCols", TwoCols],
		[EMPTY.componentId, Empty]
	]);

	let activeComponent = availComponents.get(component.componentId);
</script>

{#if activeComponent}
	<svelte:component this={activeComponent} {...component.props} slots={component.slots} />
{:else}
	{#if SELF_CLOSING_TAGS.includes(component.componentId)}
		<svelte:element this={component.componentId} {...component.props}/>
	{:else}
		<svelte:element this={component.componentId} {...component.props}>
			{#each component.slots as [k, v]}
				{#if k === DEFAULT_SLOT}
					<svelte:self component={v}></svelte:self>
				{:else}
					<!-- We are falling back to a HTML element, so we need to ignore named slots -->
				{/if}
			{/each}
		</svelte:element>
	{/if}
{/if}
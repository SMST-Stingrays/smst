<script lang="ts">
	import { type Component, DEFAULT_SLOT, EMPTY, SELF_CLOSING_TAGS } from '$lib/dynamicSlot';
	import H1 from "./pageComponents/H1.svelte";
	import Empty from '$lib/components/pageComponents/Empty.svelte';
	import HTML from '$lib/components/pageComponents/HTML.svelte';
	import TwoCols from '$lib/components/pageComponents/TwoCols.svelte';

	export let component: Component;

	// Register new components here
	// eslint-disable-next-line
	const availComponents: Map<string, any> = new Map([
		["H1", H1],
		["HTML", HTML],
		["TwoCols", TwoCols],
		[EMPTY.componentId, Empty]
	]);

	let props = {};
	for (let [k, v] of component.props) {
		props[k] = v;
	}

	let activeComponent = availComponents.get(component.componentId);
</script>

{#if activeComponent}
	<p>Render Debug: rendering {component.componentId} with props {JSON.stringify(props)}</p>
	<svelte:component this={activeComponent} {...props}>
		{#each component.slots as [k, v]}
			{#if k === DEFAULT_SLOT}
				<svelte:fragment>
					<svelte:self component={v}></svelte:self>
				</svelte:fragment>
			{:else}
				<svelte:fragment slot={k}>
					<svelte:self component={v}></svelte:self>
				</svelte:fragment>
			{/if}
		{/each}
	</svelte:component>
	<p>... render done.</p>
{:else}
	{#if SELF_CLOSING_TAGS.includes(component.componentId)}
		<svelte:element this={component.componentId} {...props}/>
	{:else}
		<svelte:element this={component.componentId} {...props}>
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
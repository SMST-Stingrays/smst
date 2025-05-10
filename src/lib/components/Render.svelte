<script lang="ts">
	import { type Component, DEFAULT_SLOT, EMPTY, SELF_CLOSING_TAGS } from '$lib/dynamicSlot';
	import H1 from './pageComponents/H1.svelte';
	import Empty from '$lib/components/pageComponents/Empty.svelte';
	import HTML from '$lib/components/pageComponents/HTML.svelte';
	import TwoCols from '$lib/components/pageComponents/TwoCols.svelte';
	import H2 from '$lib/components/pageComponents/H2.svelte';
	import H3 from '$lib/components/pageComponents/H3.svelte';
	import HeroImg from '$lib/components/pageComponents/HeroImg.svelte';
	import Paragraph from '$lib/components/pageComponents/Paragraph.svelte';
	import ImgParagraphLeft from '$lib/components/pageComponents/ImgParagraphLeft.svelte';
	import Separator from '$lib/components/pageComponents/Separator.svelte';
	import ThreeBoxes from '$lib/components/pageComponents/ThreeBoxes.svelte';
	import SecondaryPageHeader from '$lib/components/pageComponents/SecondaryPageHeader.svelte';
	import Button from '$lib/components/pageComponents/Button.svelte';
	import HomeHeroVidImg from '$lib/components/pageComponents/HomeHeroVidImg.svelte';
	import ImgParagraphWithTitle from '$lib/components/pageComponents/ImgParagraphWithTitle.svelte';
	import WaveSeparator from '$lib/components/pageComponents/WaveSeparator.svelte';
	import TimelineItem from '$lib/components/pageComponents/TimelineItem.svelte';
	import CenteredSubheader from '$lib/components/pageComponents/CenteredSubheader.svelte';
	import CenteredParagraph from '$lib/components/pageComponents/CenteredParagraph.svelte';
	import PDF from '$lib/components/pageComponents/PDF.svelte';
	import SponsorCarousel from '$lib/components/pageComponents/SponsorCarousel.svelte';

	export let component: Component;

	// Register new components here
	// eslint-disable-next-line
	const availComponents: Map<string, any> = new Map([
		['H1', H1],
		['H2', H2],
		['H3', H3],
		['HTML', HTML],
		['TwoCols', TwoCols],
		['HeroImg', HeroImg],
		['Paragraph', Paragraph],
		['ImgParagraphLeft', ImgParagraphLeft],
		['Separator', Separator],
		['ThreeBoxes', ThreeBoxes],
		['SecondaryPageHeader', SecondaryPageHeader],
		['Button', Button],
		['HomeHeroVidImg', HomeHeroVidImg],
		['ImgParagraphWithTitle', ImgParagraphWithTitle],
		['WaveSeparator', WaveSeparator],
		['TimelineItem', TimelineItem],
		['CenteredSubheader', CenteredSubheader],
		['CenteredParagraph', CenteredParagraph],
		['PDF', PDF],
		['SponsorCarousel', SponsorCarousel],
		[EMPTY.componentId, Empty],
	]);

	console.log(component);

	let activeComponent = availComponents.get(component.componentId);
</script>

{#if component && activeComponent}
	<svelte:component this={activeComponent} {...component.props} slots={component.slots} />
{:else if SELF_CLOSING_TAGS.includes(component.componentId)}
	<svelte:element this={component.componentId} {...component.props} />
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

<script lang="ts">
	import { siteConfig } from '$lib/siteConfig';
	import { page } from '$app/stores';

	export let title: string = siteConfig.name;

	$: title = $page.data?.title ? `${$page.data.title} - ${siteConfig.name}` : siteConfig.name;
</script>

<svelte:head>
	<title>{title}</title>

	<!-- Standard metadata -->
	<meta name="description" content={siteConfig.description} />
	<meta name="keywords" content={siteConfig.keywords} />
	<meta name="author" content={siteConfig.author} />

	<meta property="og:title" content={title} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={siteConfig.url + $page.url.pathname} />
</svelte:head>

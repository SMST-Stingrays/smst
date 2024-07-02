<script lang="ts">
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
</script>

<SiteHeader />
<div class="flex-1">
	<slot />
</div>
<SiteFooter />

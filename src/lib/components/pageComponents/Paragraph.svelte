<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';

	export let src: string;
</script>

<div class="container">
	<Markdown {src} />
</div>

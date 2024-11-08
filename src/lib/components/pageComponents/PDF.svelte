<script lang="ts">
	export let src: string;
</script>

<div class="container flex">
	<iframe class="flex-1 min-h-screen" title="PDF embed" {src} allow="autoplay" />
</div>

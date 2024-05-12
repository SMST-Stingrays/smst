<script>
	import "../app.pcss";
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import Metadata from '$lib/components/Metadata.svelte';
</script>

<ModeWatcher track={false} defaultMode={"dark"} />
<Toaster />
<Metadata />

<div class="relative flex min-h-screen flex-col bg-background">
	<slot />
</div>
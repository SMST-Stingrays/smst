<script>
	import { page } from '$app/stores';
</script>

<div class="flex items-center justify-between">
	<h1 class="text-lg font-semibold md:text-2xl">{$page.data.title}</h1>
</div>
<p>
	Select one of the pages to the left to continue! Click the globe icon to return to the public site
	and the profile icon to log out.
</p>

<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
</script>

<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
	<div class="hidden bg-muted lg:block">
		<img
			src="/images/placeholder.svg"
			alt="placeholder"
			width="1920"
			height="1080"
			class="h-screen w-screen object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Forgot your password?</h1>
				<p class="text-balance text-muted-foreground">
					If you have forgotten the password to your account, contact team leadership and they can reset it for you.
				</p>
			</div>
			<div class="text-center text-sm">
				<a href="/login" class="underline underline-offset-4 font-semibold">&larr; Back to login</a>
			</div>
		</div>
	</div>
</div>

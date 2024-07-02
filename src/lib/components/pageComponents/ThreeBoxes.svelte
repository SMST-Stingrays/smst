<script lang="ts">
	import * as Card from "$lib/components/ui/card";

	export let h1: string;
	export let text1: string;
	export let h2: string;
	export let text2: string;
	export let h3: string;
	export let text3: string;
</script>

<div class="container">
	<div class="flex justify-center items-center gap-8 flex-wrap lg:mx-8 container mx-auto">
		<Card.Root class="max-w-sm h-48">
			<Card.Header>
				<Card.Title>{h1}</Card.Title>
			</Card.Header>
			<Card.Content>
				<p>{text1}</p>
			</Card.Content>
		</Card.Root>
		<Card.Root class="max-w-sm h-48">
			<Card.Header>
				<Card.Title>{h2}</Card.Title>
			</Card.Header>
			<Card.Content>
				<p>{text2}</p>
			</Card.Content>
		</Card.Root>
		<Card.Root class="max-w-sm h-48">
			<Card.Header>
				<Card.Title>{h3}</Card.Title>
			</Card.Header>
			<Card.Content>
				<p>{text3}</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>
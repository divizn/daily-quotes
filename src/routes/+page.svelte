<script lang="ts">
	import Particles from '$lib/components/Particles.svelte';
	import Quote from '$lib/components/Quote.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Quote by {data.author}</title>
	<meta name="description" content="{data.text} - {data.author}" />
</svelte:head>

<div class="relative flex min-h-[70vh] items-center">
	<Particles class="animate-fade-in pointer-events-none absolute inset-0" quantity={80} />

	<main class="relative mx-auto w-full max-w-4xl px-6 py-24">
		<Quote text={data.text} author={data.author} date={data.date} />
	</main>
</div>

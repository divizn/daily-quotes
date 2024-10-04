<script lang="ts">
    import Quote from '$lib/components/Quote.svelte';
	import quoteStore from '$lib/stores/quoteStore';
	import type { Quote as TQuote } from '$lib/stores/quoteStore';

	let quote: TQuote | null = null;

	quoteStore.subscribe((quotes: TQuote[]) => {
		quote = quotes[1] || null; // Set the current quote to the first one
	});
    console.log('Hello from +page.svelte');
</script>

<main class="flex-grow flex items-center justify-center">
    {#if quote}
        <Quote {quote}/>
    {:else}
        <p>Loading...</p>
    {/if}
</main>